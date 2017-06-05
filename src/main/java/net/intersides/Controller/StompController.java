package net.intersides.Controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.intersides.Entity.BroadcastMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Created by marcofalsitta on 05.06.17.
 * InterSides.net
 */

@Controller
public class StompController {

    private static final Logger console = LoggerFactory.getLogger(StompController.class);

    @MessageMapping("/onEditItemStarted")
    @SendTo("/topic/onFreezeItemEditing")
    public BroadcastMessage onEditItemStarted(BroadcastMessage message) throws Exception {
        console.info("onEditItemStarted received");
        return new BroadcastMessage("onFreezeItemEditing", message.getItemId(), message.getClientId());
    }

    @MessageMapping("/onEditItemEnded")
    @SendTo("/topic/onUnfreezeItemEditing")
    public BroadcastMessage onEditItemEnded(BroadcastMessage message) throws Exception {
        console.info("onUnfreezeItemEditing received");
        return new BroadcastMessage("onUnfreezeItemEditing", message.getItemId(), message.getClientId());
    }

    @MessageMapping("/onItemsListChanged")
    @SendTo("/topic/onRefreshItemList")
    public BroadcastMessage onItemsListChanged(BroadcastMessage message) throws Exception {
        console.info("onItemsListChanged received");
        console.info("onItemsListChanged received");
        //message.getType() --> onItemRemoved, onItemAdded
        return new BroadcastMessage(message.getType(), message.getItemId(), message.getClientId());
    }



}
