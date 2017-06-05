package net.intersides.Entity;

/**
 * Created by marcofalsitta on 05.06.17.
 */
public class BroadcastMessage {

    public String type;
    public String itemId;
    public String clientId;


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public BroadcastMessage(){}

    public BroadcastMessage(String type, String itemId, String clientId){
        this.type = type;
        this.itemId = itemId;
        this.clientId = clientId;
    }

}
