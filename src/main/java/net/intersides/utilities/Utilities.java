package net.intersides.utilities;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by marcofalsitta on 25.05.17.
 */


public enum Utilities {
    ;

    public static Timestamp generateTimestamp() {

        // 1) create a java calendar instance
        Calendar calendar = Calendar.getInstance();

        // 2) get a java.util.Date from the calendar instance.
        //    this date will represent the current instant, or "now".
        Date now = calendar.getTime();

        // 3) a java current time (now) instance
        return new Timestamp(now.getTime());

    }
}
