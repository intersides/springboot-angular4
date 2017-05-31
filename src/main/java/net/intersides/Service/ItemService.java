package net.intersides.Service;

import com.google.gson.JsonObject;
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


    public void removeAllItems(){
        this.itemDao.removeAllItems();
    }

    public ServiceResult getAllItems(){
        Collection<Item> allItems = this.itemDao.getAllItems();
        if(allItems != null){
            return new ServiceResult(ServiceResult.OperationResult.SUCCEEDED, "all items have been fetched", allItems);

        }
        else{
            return new ServiceResult(ServiceResult.OperationResult.FAILED, "could not fetch items ");
        }
    }

    public ServiceResult getItemById(String id){
//        return this.itemDao.read(id);
        Item foundItem = this.itemDao.read(id);
        if(foundItem != null){
            return new ServiceResult(ServiceResult.OperationResult.SUCCEEDED, "item with id "+id+" has been found", foundItem);
        }
        else{
            return new ServiceResult(ServiceResult.OperationResult.FAILED, "could not find item with id "+id);
        }
    }

    public ServiceResult removeItemById(String id){
        Item itemToBeRemoved = this.itemDao.read(id);
        return this.itemDao.delete(id)
                ? new ServiceResult(ServiceResult.OperationResult.SUCCEEDED, "item with id "+id+" has been removed", itemToBeRemoved)
                : new ServiceResult(ServiceResult.OperationResult.FAILED, "failed to remove item with id "+id);
    }

    public ServiceResult addItem(Item item) {

        if(this.itemDao.isIdPresent(item.getId())){
            return new ServiceResult(ServiceResult.OperationResult.FAILED, "item with the same id already exists");
        }

        Collection<Item> allItems = this.itemDao.getAllItems();
        int itemsCount = allItems.size();
        if(itemsCount < 5){
            boolean result = this.itemDao.create(item);
            if(result){
                return new ServiceResult(ServiceResult.OperationResult.SUCCEEDED, "item has been added", item);
            }
            else{
                return new ServiceResult(ServiceResult.OperationResult.FAILED, "failed to create item in database");
            }

        }
        else{
            return new ServiceResult(ServiceResult.OperationResult.FAILED, "maximum number of items have been reached");
        }
    }

    public ServiceResult updateItem(Item item){
        return this.itemDao.update(item)
                ? new ServiceResult(ServiceResult.OperationResult.SUCCEEDED, "item has been updated", item)
                : new ServiceResult(ServiceResult.OperationResult.FAILED, "failed to update item with id "+item.getId());
    }




}
