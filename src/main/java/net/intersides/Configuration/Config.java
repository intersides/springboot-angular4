package net.intersides.Configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by marcofalsitta on 03.06.17.
 */

//@ConfigurationProperties
//@ConfigurationPropertiesBinding
public class Config {
    private List<String> servers = new ArrayList<String>();

    public List<String> getServers() {
        return this.servers;
    }
}
