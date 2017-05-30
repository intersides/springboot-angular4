package net.intersides;

import net.intersides.Entity.Item;
import net.intersides.Service.ItemService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collection;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by marcofalsitta on 25.05.17.
 *
 */


@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemServiceTest {

    private static final Logger console = LoggerFactory.getLogger(ItemServiceTest.class);

    enum ItemIDS {
        ZERO  {
            public String toString(){
                return "00000000-0000-0000-0000-000000000000";
            }
        },
        ONE {
            public String toString() {
                return "00000000-0000-0000-0000-000000000001";
            }
        },

        TWO {
            public String toString() {
                return "00000000-0000-0000-0000-000000000002";
            }
        }
    }


    @Autowired
    private ItemService itemService;

    @Before
    public void setData(){

        itemService.removeAllItems();

        Item newItem = new Item("item 1", "item 1 description");
        newItem.setId(ItemIDS.ONE.toString());
        itemService.addItem(newItem);
    }

    @Test
    public void crudOperations(){

        Collection<Item> allItems = itemService.getAllItems().getItems();
        assertThat(allItems.size()).isEqualTo(1);

        new Item(ItemIDS.ZERO.toString(), "a", "b");

        //existing item
        Item existingItem = itemService.getItemById(ItemIDS.ONE.toString()).getItem();
        assertThat(existingItem.getId()).isEqualTo("00000000-0000-0000-0000-000000000001");
        assertThat(existingItem.getName()).isEqualTo("item 1");
        assertThat(existingItem.getDescription()).isEqualTo("item 1 description");


        //add empty item
        Item emptyItem = new Item();
        itemService.addItem(emptyItem);
        assertThat(emptyItem.getName()).isEqualTo(null);
        assertThat(emptyItem.getDescription()).isEqualTo(null);
        assertThat(emptyItem.getId()).isNotEqualTo(null);
        assertThat(emptyItem.getCreationDate()).isNotEqualTo(null);


        //remove empty item
        Item removedItem = itemService.removeItemById(emptyItem.getId()).getItem();
        console.info("removed item "+removedItem.toString());

        Item deletedItem = itemService.getItemById(emptyItem.getId()).getItem();
        assertThat(deletedItem).isNull();
        Item itemOne = new Item("new item 1", "new item description for n.1");
        itemService.addItem(itemOne);

        //check length
        assertThat( itemService.getAllItems().getItems().size()).isEqualTo(2);



        Item itemThatWillBeUpdated = new Item("new item 2", "new item description for n.2");

        itemThatWillBeUpdated.setId(ItemIDS.TWO.toString());

        Item addedItem = itemService.addItem(itemThatWillBeUpdated).getItem();

        assertThat(addedItem.getId()).isEqualTo(ItemIDS.TWO.toString());
        assertThat(addedItem.getDescription()).isEqualTo("new item description for n.2");

        addedItem.setDescription("update description for item .2");
        itemService.updateItem(itemThatWillBeUpdated);
        assertThat(addedItem.getDescription()).isEqualTo("update description for item .2");


        //should not create an existing item twice
        Item nullItem = itemService.addItem(itemThatWillBeUpdated).getItem();
        assertThat(nullItem).isNull();

        allItems = itemService.getAllItems().getItems();
        allItems.forEach((Item item)-> console.info(item.toString()));

        assertThat(allItems.size()).isEqualTo(3);


        //should not

    }

}
