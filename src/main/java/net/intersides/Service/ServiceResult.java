package net.intersides.Service;

import net.intersides.Entity.Item;

import java.util.Collection;

/**
 * Created by marcofalsitta on 30.05.17.
 *
 */


public class ServiceResult {

    public enum OperationResult {
        SUCCEEDED,
        FAILED
    }


    private OperationResult result;
    private Item item;
    private Collection<Item> items;
    private String message;

    public OperationResult getResult() {
        return result;
    }

    public Item getItem() {
        return item;
    }

    public Collection<Item> getItems(){
        return items;
    }

    public String getMessage() {
        return message;
    }

    ServiceResult(OperationResult result, String message, Item item){
        this.result = result;
        this.message = message;
        this.item = item;
    }

    ServiceResult(OperationResult result, String message, Collection<Item> items){
        this.result = result;
        this.message = message;
        this.items = items;
    }

    ServiceResult(OperationResult result, String message){
        this.result = result;
        this.message = message;
    }
}
