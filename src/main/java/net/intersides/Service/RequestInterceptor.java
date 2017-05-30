package net.intersides.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import net.intersides.Controller.ItemController;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by marcofalsitta on 29.05.17.
 */

@Component
public class RequestInterceptor extends HandlerInterceptorAdapter {

    private static final Logger console = LoggerFactory.getLogger(RequestInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {

        String requestURI = request.getRequestURI();
        String contentType = request.getContentType();

        console.warn("request uri:"+requestURI);
        console.warn("content type:"+contentType);

        if(contentType == null || !contentType.contentEquals("application/json")){
            console.error("preHandle error detection on content type:"+contentType);
            console.error("this content type is not allowed");
            response.setStatus(HttpStatus.FORBIDDEN.value());

            JsonObject jo = new JsonObject();
            jo.addProperty("msg","wrong content type");

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jo.toString());
            return false;

        }

        //Integer id = ServletRequestUtils.getIntParameter(request, "id", 0);

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView model) throws Exception {
        console.info("In postHandle request processing completed by @RestController");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3) throws Exception {
        console.info("In afterCompletion Request Completed");
    }

}
