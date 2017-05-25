package net.intersides.Controller;


import net.intersides.Greeting;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Created by marcofalsitta on 24.05.17.
 */

@RestController
public class Items {
    private static final String template = "Hello %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/old_items")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {

        return new Greeting(counter.incrementAndGet(),
                String.format(template, name));
    }
}
