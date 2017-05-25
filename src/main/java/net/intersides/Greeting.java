package net.intersides;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by marcofalsitta on 24.05.17.
 */
public class Greeting {

    static final Logger console = LoggerFactory.getLogger(Greeting.class);

    private final long id;
    private final String content;

    public Greeting(long id, String content){
        this.id = id;
        this.content = content;
    }

    public long getId(){
        return this.id;
    }

    public String getContent(){
        return this.content;
    }


}
