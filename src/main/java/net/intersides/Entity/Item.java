package net.intersides.Entity;

import net.intersides.utilities.Utilities;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

/**
 * Created by marcofalsitta on 24.05.17.
 */
public class Item {

    private String id;
    private String name;
    private String description;
    private Timestamp creationDate;

    private static int MAX_LENGTH=36;

    public class IdTooLongException extends Exception {

        public IdTooLongException(String message) {
            super(message);
        }

    }

    public Item(){
        this.id = UUID.randomUUID().toString();
        this.creationDate = Utilities.generateTimestamp();
    }

    public Item(String name, String description){
        this();
        this.name = name;
        this.description = description;
    }

    public Item(String id, String name, String description) throws IdTooLongException {
        this(name, description);
        this.setId(id);
    }


    public String getId() {
        return id;
    }

    public void setId(String id) throws IdTooLongException{

        if(id.length() > MAX_LENGTH){
            throw new IdTooLongException("Id surpassed the maximum length ("+MAX_LENGTH+")");
        }
        else{
            this.id = id;
        }
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Timestamp creationDate){
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String toString(){
        return "Item: id:["+this.getId()+"], creationDate:["+this.creationDate.toString()+"], name:{"+this.getName()+"}, description:{"+this.getDescription()+"}";
    }
}
