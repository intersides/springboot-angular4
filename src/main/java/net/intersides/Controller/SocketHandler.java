package net.intersides.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.intersides.Entity.Item;
import net.intersides.utilities.Utilities;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by marcofalsitta on 04.06.17.
 */

@Component
public class SocketHandler extends TextWebSocketHandler {

    private static final Logger console = LoggerFactory.getLogger(SocketHandler.class);

    List sessions = new CopyOnWriteArrayList<WebSocketSession>();

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // The WebSocket has been closed
        console.error("The WebSocket has been closed");
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

        console.error("The WebSocket has errors");
        console.error(exception.getLocalizedMessage());

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        console.error("WS connection has been established");

        if(!sessions.add(session)){
            console.warn("failed to add session to list");
        }
        else{
            //send back a message with user session id.
            JSONObject dataPart = new JSONObject();
            dataPart.put("sessionId", session.getId());
            JSONObject responseObj = buildResponse("onConnectionEstablished", dataPart);
            session.sendMessage(new TextMessage(responseObj.toJSONString()));
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        String payload = message.getPayload();

        JSONParser parser = new JSONParser();
        try {
            JSONObject json = (JSONObject) parser.parse(payload);

            String eventType = (String)json.get("type");
            if(eventType != null){
                if(!eventType.equals("onHeartBeat")){
                    console.info(payload);
                    console.info("eventType:"+eventType);

                    if(eventType.equals("onEditItemStarted")){

                        String itemId = (String) json.get("itemId");
                        String userId = (String) json.get("userId");

                        JSONObject dataPart = new JSONObject();
                        dataPart.put("itemId", itemId);
                        dataPart.put("userId", userId);

                        JSONObject responseObj = buildResponse("onFreezeItemEditing", dataPart);
                        broadCastMessage(responseObj);
                    }
                    else if(eventType.equals("onEditItemEnded")){

                        String itemId = (String) json.get("itemId");
                        String userId = (String) json.get("userId");

                        JSONObject dataPart = new JSONObject();
                        dataPart.put("itemId", itemId);
                        dataPart.put("userId", userId);

                        JSONObject responseObj = buildResponse("onUnfreezeItemEditing", dataPart);
                        broadCastMessage(responseObj);
                    }

                }

            }
            else{
                console.error("eventType is null");
            }

        } catch (ParseException e) {
            console.error("handleTextMessage() cannot convert payload to json:"+payload);
        }

    }

    private void broadCastMessage(JSONObject message) {
        for(Object webSocketSession : sessions) {
            WebSocketSession wSession = (WebSocketSession) webSocketSession;
            console.info("session id:"+wSession.getId());
            message.put("sessionId", wSession.getId());
            try {
                wSession.sendMessage(new TextMessage(message.toJSONString()));
            } catch (IOException e) {
                e.printStackTrace();
                console.error("cannot broadcast messages");
            }
        }
    }


    private JSONObject buildResponse(String type, Object data) {
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("type", type);
        jsonResponse.put("sessionId", type);
        jsonResponse.put("data", data);
        jsonResponse.put("ts", Utilities.generateTimestamp().toString());
        return jsonResponse;
    }


}
