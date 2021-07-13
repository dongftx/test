package com.asterinet.react.tcpsocket;

import android.annotation.SuppressLint;
import android.os.AsyncTask;

import com.facebook.react.bridge.ReadableMap;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ConcurrentHashMap;

public final class TcpSocketServer extends TcpSocketClient {
    private ServerSocket serverSocket;
    private TcpReceiverTask.OnDataReceivedListener mReceiverListener;
    private int clientSocketIds;
    private final ConcurrentHashMap<Integer, TcpSocketClient> socketClients;

    @SuppressLint("StaticFieldLeak")
    private final AsyncTask listening = new AsyncTask() {
        @Override
        protected Void doInBackground(Object[] objects) {
            try {
                while (!isCancelled() && !serverSocket.isClosed()) {
                    Socket socket = serverSocket.accept();
                    int clientId = getClientId();
                    TcpSocketClient socketClient = new TcpSocketClient(mReceiverListener, clientId, socket);
                    socketClients.put(clientId, socketClient);
                    mReceiverListener.onConnection(getId(), clientId, new InetSocketAddress(socket.getInetAddress(), socket.getPort()));
                    socketClient.startListening();
                }
            } catch (IOException e) {
                if (!serverSocket.isClosed()) {
                    mReceiverListener.onError(getId(), e.getMessage());
                }
            }
            return null;
        }
    };


    public TcpSocketServer(final ConcurrentHashMap<Integer, TcpSocketClient> socketClients, final TcpReceiverTask.OnDataReceivedListener receiverListener, final Integer id,
                           final ReadableMap options) throws IOException {
        super(id);
        // Get data from options
        int port = options.getInt("port");
        String address = options.getString("host");
        this.socketClients = socketClients;
        clientSocketIds = (1 + getId()) * 1000;
        // Get the addresses
        InetAddress localInetAddress = InetAddress.getByName(address);
        // Create the socket
        serverSocket = new ServerSocket(port, 50, localInetAddress);
        // setReuseAddress
        try {
            boolean reuseAddress = options.getBoolean("reuseAddress");
            serverSocket.setReuseAddress(reuseAddress);
        } catch (Exception e) {
            // Default to true
            serverSocket.setReuseAddress(true);
        }
        mReceiverListener = receiverListener;
        listen();
    }

    /**
     * Next ID for a client socket
     *
     * @return The next ID for a client socket
     */
    private int getClientId() {
        return clientSocketIds++;
    }

    private void listen() {
        //noinspection unchecked
        listening.executeOnExecutor(getExecutorService());
    }

    @Override
    public void write(final byte[] data) {
        mReceiverListener.onError(getId(), "SERVER CANNOT WRITE");
    }

    @Override
    public void close() {
        try {
            if (!listening.isCancelled()) {
                // stop the receiving task
                listening.cancel(true);
                getExecutorService().shutdown();
            }

            // close the socket
            if (serverSocket != null && !serverSocket.isClosed()) {
                serverSocket.close();
                mReceiverListener.onClose(getId(), null);
                serverSocket = null;
            }
        } catch (IOException e) {
            mReceiverListener.onClose(getId(), e.getMessage());
        }
    }
}