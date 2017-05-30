package net.intersides.Dao;

import net.intersides.Entity.Item;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by marcofalsitta on 24.05.17.
 * Data Access Layer
 */

@Repository
@Qualifier("staticData")
public class ItemDaoStaticData implements ItemDao {

    static final Logger console = LoggerFactory.getLogger(ItemDaoStaticData.class);

    private static Map<String, Item> items;

    static {
        items = new HashMap<String, Item>(){
            {
                put("1", new Item("item 1", "this is the item 1"));
                put("2", new Item("item 2", "this is the item 2"));
                put("3", new Item("item 3", "this is the item 3"));
            }
        };
    }

    @Override
    public Collection<Item> getAllItems(){
        return items.values();
    }

    @Override
    public void removeAllItems(){
        items.clear();
    }

    @Override
    public boolean create(Item item){
        //return previous item associate to the id, or null
        Item newItem = items.putIfAbsent(item.getId(), item);
        return newItem == null;
    }

    @Override
    public Item read(String id){
        return items.get(id);
    }


    @Override
    public boolean update(Item item){
        Item itemToUpdate = items.get(item.getId());
        if(itemToUpdate != null){
            items.put(item.getId(), item);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(String id){
        Item removedItem = items.remove(id);
        return removedItem != null;
    }

    @Override
    public boolean isIdPresent(String id){
        return items.get(id) != null;
    }


}
