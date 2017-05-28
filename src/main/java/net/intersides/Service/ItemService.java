package net.intersides.Service;

import net.intersides.Dao.ItemDao;
import net.intersides.Entity.Item;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * Created by marcofalsitta on 24.05.17.
 * Business logic
 */

@Service
public class ItemService {


    static final Logger console = LoggerFactory.getLogger(ItemService.class);

    @Autowired
    @Qualifier("mySQLData")
//    @Qualifier("staticData")
    private ItemDao itemDao;

    public Collection<Item> getAllItems(){
        return this.itemDao.getAllItems();
    }

    public void removeAllItems(){
        this.itemDao.removeAllItems();
    }

    public Item getItemById(String id){
        return this.itemDao.read(id);
    }

    public Item removeItemById(String id){
        Item itemToBeRemoved = this.getItemById(id);
        return this.itemDao.delete(id) ? itemToBeRemoved : null;
    }

    public Item addItem(Item item){
        boolean result = this.itemDao.create(item);
        if(result){
            return item;
        }
        else{
            return null;
        }
    }

    public Item updateItem(Item item){
        return this.itemDao.update(item) ? item : null;
    }



}
