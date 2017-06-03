package net.intersides.Dao;

import net.intersides.Entity.Item;
import org.springframework.core.env.Environment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by marcofalsitta on 24.05.17.
 */

@Repository("mysql")
@Qualifier("mySQLData")
public class ItemDaoMySQL implements ItemDao {

    private static final Logger console = LoggerFactory.getLogger(ItemDaoMySQL.class);

    @Autowired //use the application properties attributes for connections
    private JdbcTemplate jdbcTemplate;

    public ItemDaoMySQL(){

    }

    private static class ItemRowMapper implements RowMapper<Item>{
        @Override
        public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
            //rs could be null ?

            Item item = new Item();
            item.setId(rs.getString("id"));
            item.setCreationDate(rs.getTimestamp("creationTimestamp"));
            item.setName(rs.getString("name"));
            item.setDescription(rs.getString("description"));

            return item;
        }
    }

    @Override
    public Collection<Item> getAllItems() {
        return jdbcTemplate.query("SELECT * FROM `items`;", new ItemRowMapper());
    }

    @Override
    public void removeAllItems(){
        jdbcTemplate.update("TRUNCATE TABLE items");
    }

    @Override
    @Transactional
    public boolean insertConditional(int rowLimits, Item item){

        String statement = "INSERT INTO items(id, name, description) " +
                "SELECT ?, ?, ? FROM Dual " +
                "WHERE (SELECT COUNT(*) FROM items) < ?";
        int updatedRows = jdbcTemplate.update(statement, item.getId(), item.getName(), item.getDescription(), rowLimits);
        return updatedRows == 1;

    }

    @Override
    public boolean create(Item item) {

        try {
            jdbcTemplate.update("INSERT INTO items (id, name, description) VALUES(?, ?, ?);", item.getId(), item.getName(), item.getDescription());
        }
        catch (DataAccessException ex){
            console.warn("item -> "+item.toString());
            console.error(ex.getMessage());
            return false;
        }
        return true;


    }


    @Override
    public Item read(String id) {
        Item item;
        try{
            item = jdbcTemplate.queryForObject(
                    "SELECT * FROM `items` WHERE id = ?;",
                    new ItemRowMapper(), id);

        }catch(EmptyResultDataAccessException exc){
            item = null;
        }
        return item;

    }

    @Override
    public boolean update(Item item) {
        final String id = item.getId();
        final String name = item.getName();
        final String description = item.getDescription();

        int updatedRows = jdbcTemplate.update(
                "UPDATE items SET name = ?, description = ? WHERE items.id = ?;", name, description, id);
        return updatedRows != 0;
    }


    @Override
    public boolean delete(String id) {
        int removedRows = jdbcTemplate.update("DELETE FROM items WHERE id = ?;", id);
        return removedRows == 1;
    }

    @Override
    public boolean isIdPresent(String id){
        String sql = "SELECT COUNT(*) FROM `items` WHERE items.id = ?";
        return 1 == jdbcTemplate.queryForObject(sql, new Object[] { id }, Integer.class);
    }

}
