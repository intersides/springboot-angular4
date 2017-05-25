package net.intersides;

import net.intersides.Entity.Item;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by marcofalsitta on 25.05.17.
 */

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class ItemTests {

    @Test
    public void itemInitialisation(){

        Item item = new Item();
        assertThat(item.getId().length()).isEqualTo(36); //32 + 4 dashes
        assertThat(item.getCreationDate()).isNotEqualTo(null); //timestamp at initialisation
        assertThat(item.getName()).isEqualTo(null);
        assertThat(item.getDescription()).isEqualTo(null);

        Item filledItem = new Item("label content", "this is the actual description");
        assertThat(filledItem.getName()).isEqualTo("label content");
        assertThat(filledItem.getDescription()).isEqualTo("this is the actual description");

    }
}
