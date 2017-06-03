package net.intersides.Controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.intersides.Entity.Item;
import net.intersides.Service.ItemService;
import net.intersides.Service.ServiceResult;
import net.intersides.utilities.Utilities;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by marcofalsitta on 24.05.17.
 */

@RestController
public class ItemController {
    private static final Logger console = LoggerFactory.getLogger(ItemController.class);

    @Autowired
    private ItemService itemService;

    /**
     *
     * @return ResponseEntity json package
     */
    @RequestMapping(value = "/removeAll", method = RequestMethod.GET)
    public ResponseEntity<JSONObject> removeAll(){
        console.info("ItemController.removeAll()");
        this.itemService.removeAllItems();
        return new ItemServiceResponse("all items removed").write();
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET)
    public ResponseEntity<JSONObject> getAllItems(){
        console.info("ItemController.getAllItems()");

        ServiceResult result = this.itemService.getAllItems();
        if(result.getResult() == ServiceResult.OperationResult.SUCCEEDED){
            Collection<Item> items = result.getItems();

            int itemCount = items.size();
            String msg = "list is empty";
            if(itemCount > 0){
                String itemStr = "item";
                if(itemCount > 1){
                    itemStr += "s";
                }
                msg = itemCount+" "+itemStr+" have been found";
            }
            return new ItemServiceResponse(HttpStatus.OK, items, msg).write();
        }
        else{
            return new ItemServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, result.getMessage()).write();
        }
    }


    //SINGLE ITEM need to use POST. Cannot use GET with json body
    @RequestMapping(value = "/item", method = RequestMethod.POST)
    public ResponseEntity<JSONObject> getItemById(@RequestBody Item item){
        console.info("POST -> ItemController.getItemById("+item.getId()+")");

        String itemId = item.getId();

        ServiceResult result = this.itemService.getItemById(itemId);
        if(result.getResult() == ServiceResult.OperationResult.SUCCEEDED){
            Item foundItem = result.getItem();
            return new ItemServiceResponse(HttpStatus.OK, foundItem, result.getMessage()).write();
        }
        else{
            return new ItemServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, result.getMessage()).write();
        }

    }

    @RequestMapping(value = "/item", method = RequestMethod.DELETE)
    public ResponseEntity<JSONObject> removeItemById(@RequestBody  String payload){
        console.info("DELETE -> ItemController.delete("+payload+")");
        String itemId;
        final JsonElement jElem = new JsonParser().parse(payload);
        final JsonObject jObj = jElem.getAsJsonObject();
        itemId = jObj.get("id").getAsString();

        ServiceResult result = this.itemService.removeItemById(itemId );
        if(result.getResult() == ServiceResult.OperationResult.SUCCEEDED){
            Item deletedItem = result.getItem();
            return new ItemServiceResponse(HttpStatus.OK, deletedItem, result.getMessage()).write();
        }
        else{
            return new ItemServiceResponse(HttpStatus.BAD_REQUEST, null, result.getMessage()).write();
        }
    }

    @RequestMapping(value = "/item", method = RequestMethod.PUT)
    public ResponseEntity<JSONObject> addItem(@RequestBody  Item item){
        console.info("PUT -> ItemController.create()"+item.toString());

        if(item.getId() == null){
            return new ItemServiceResponse(HttpStatus.BAD_REQUEST, "Missing mandatory data from client").write();
        }

        ServiceResult result = this.itemService.addItemCondition(item);
        if(result.getResult() == ServiceResult.OperationResult.SUCCEEDED){
            return new ItemServiceResponse(HttpStatus.OK, result.getItem(), result.getMessage()).write();
        }
        else{
            return new ItemServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, result.getMessage()).write();
        }
    }

    //PATCH IS USED for updates operations
    @RequestMapping(value = "/item", method = RequestMethod.PATCH)
    public ResponseEntity<JSONObject> updateItem(@RequestBody  Item item){

        console.info("PATCH -> ItemController.update()"+ item.toString());

        ServiceResult result = this.itemService.updateItem(item);
        if(result.getResult() == ServiceResult.OperationResult.SUCCEEDED){
            return new ItemServiceResponse(result.getItem(), result.getMessage()).write();
        }
        else{
            return new ItemServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR,result.getMessage()).write();

        }
    }


    class ItemServiceResponse{

        String message;
        Object data;
        HttpStatus status;


        ItemServiceResponse(HttpStatus status, Object data, String msg){
            this.status = status;
            this.data = data;
            this.message = msg;
        }

        ItemServiceResponse(HttpStatus status, String msg){
            this.status = status;
            this.data = null;
            this.message = msg;
        }


        ItemServiceResponse(Object data, String msg){
            this.status = HttpStatus.OK;
            this.data = data;
            this.message = msg;
        }

        ItemServiceResponse(String msg){
            this.status = HttpStatus.OK;
            this.data = null;
            this.message = msg;
        }


        ResponseEntity<JSONObject> write(){
            JSONObject jsonParts = new JSONObject();
            jsonParts.put("msg", this.message);
            jsonParts.put("data", this.data);
            jsonParts.put("ts", Utilities.generateTimestamp());
            return new ResponseEntity<>(jsonParts, this.status);
        }



    }


}
