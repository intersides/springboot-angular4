package net.intersides.Controller;

import net.intersides.Entity.Item;
import net.intersides.Service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Collection;

/**
 * Created by marcofalsitta on 24.05.17.
 */

@RestController
public class ItemController {
    static final Logger console = LoggerFactory.getLogger(ItemController.class);

    @Autowired
    private ItemService itemService;

    //ITEMS COLLECTION
    @RequestMapping(value = "/items", method = RequestMethod.GET)
    public Collection<Item> getAllItems(){
        console.info("ItemController.getAllItems()");
        return this.itemService.getAllItems();
    }

    //SINGLE ITEM
    @RequestMapping(value = "/item/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getItemById(@PathVariable("id") String id){
        console.info("GET -> ItemController.read("+id+")");
        Item foundItem = this.itemService.getItemById(id);
        if(foundItem != null){
            return new ResponseEntity<Object>(this.itemService.getItemById(id), HttpStatus.OK);
        }
        else{
            JSONObject entity = new JSONObject();
            entity.put("message", "Could not find item with id"+id);
            return new ResponseEntity<Object>(entity, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/item/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> removeItemById(@PathVariable("id") String id){
        console.info("DELETE -> ItemController.delete("+id+")");
        Item deletedItem = this.itemService.removeItemById(id);
        if(deletedItem != null){
            return new ResponseEntity<Object>(deletedItem, HttpStatus.OK);
        }
        else{
            JSONObject entity = new JSONObject();
            entity.put("message", "Could not remove item. Item does not exists.");
            return new ResponseEntity<Object>(entity, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/item", method = RequestMethod.PUT)
    public ResponseEntity<Object> addItem(@RequestBody  Item item){
        console.info("PUT -> ItemController.create()"+item.toString());
        Item createItem = this.itemService.addItem(item);
        if(createItem != null){
            return  new ResponseEntity<Object>(createItem, HttpStatus.OK);
        }
        else{
            JSONObject entity = new JSONObject();
            entity.put("message", "Could not create item");
            return new ResponseEntity<Object>(entity, HttpStatus.BAD_REQUEST);
        }
    }

    //POST IS USED for updates operations
    @RequestMapping(value = "/item/", method = RequestMethod.POST)
    public ResponseEntity<Object> updateItem(@RequestBody  Item item){
        console.info("POST -> ItemController.update()");
        Item updatedItem = this.itemService.updateItem(item);
        if(updatedItem != null){
            return  new ResponseEntity<Object>(updatedItem, HttpStatus.OK);
        }
        else{
            JSONObject entity = new JSONObject();
            entity.put("message", "Could not update item.");
            return new ResponseEntity<Object>(entity, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


}
