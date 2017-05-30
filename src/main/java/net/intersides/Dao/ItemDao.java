package net.intersides.Dao;

import net.intersides.Entity.Item;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by marcofalsitta on 24.05.17.
 * CRUD interface
 */
public interface ItemDao {

    Collection<Item> getAllItems();

    void removeAllItems();

    boolean create(Item item);

    Item read(String id);

    boolean update(Item item);

    boolean delete(String id);

    boolean isIdPresent(String id);

}
