package net.intersides;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.intersides.Entity.Item;
import net.intersides.utilities.Utilities;
import org.hamcrest.CoreMatchers;
import org.json.JSONException;
import org.json.simple.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;


/**
 * Created by marcofalsitta on 30.05.17.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RequestsApplicationTests {

    private static final Logger console = LoggerFactory.getLogger(RequestsApplicationTests.class);

    @LocalServerPort
    private int port;

    TestRestTemplate restTemplate = new TestRestTemplate();

    HttpHeaders headers = new HttpHeaders();

    @Before
    public void before() {
        //empty the database
        headers.add("Content-type","application/json");
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/removeAll"),
                HttpMethod.GET, entity, String.class
        );

    }

    /**
     * The Store endopoint must accept only JSON as body content or forbidden code will be returned
     */
    @Test
    public void contentTypeAppJson(){

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/items"),
                HttpMethod.GET, null, String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
        assertThat(response.getStatusCode().value()).isEqualTo(403);
    }

    @Test
    public void missingMandatoryData(){
        headers.add("Content-type","application/json");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", null); //must specify null value or the constructor will automatically assign an id.
        jsonObject.put("name", "some name");
        jsonObject.put("description", "some description");
        HttpEntity<JSONObject> itemEntity = new HttpEntity<>(jsonObject, headers);

        //perform PUT with invalid object
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.PUT, itemEntity, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getStatusCode().value()).isEqualTo(400);
        assertThat(response.getBody()).contains("Missing mandatory data from client");

    }

    @Test
    public void putItemTest(){
        headers.add("Content-type","application/json");

        Item  newItem = new Item("1234", "my 1234 name", "my 1234 description");
        HttpEntity<Item> itemEntity = new HttpEntity<>(newItem, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.PUT, itemEntity, String.class);

        String responseContentType = response.getHeaders().get(HttpHeaders.CONTENT_TYPE).get(0);

        assertThat(responseContentType).contains("application/json");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getBody()).contains("item has been added");
    }

    @Test
    public void cannotInsertMoreThan5Items(){

        headers.add("Content-type","application/json");

        for(int i = 0; i < 5; i++){
            String id = UUID.randomUUID().toString();
            Item newItem = new Item(id, "my name "+i, "my description "+i);
            HttpEntity<Item> itemEntity = new HttpEntity<>(newItem, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    createURLWithPort("/item"),
                    HttpMethod.PUT, itemEntity, String.class);

            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        }

        //adding one more item must cause a 500 error
        String id = UUID.randomUUID().toString();
        Item newItem = new Item(id, "my name 6", "my description 6");
        HttpEntity<Item> itemEntity = new HttpEntity<>(newItem, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.PUT, itemEntity, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getStatusCode().value()).isEqualTo(500);
        assertThat(response.getBody()).contains("maximum number of items have been reached");
    }


    @Test
    public void getAllItemsTest(){

        headers.add("Content-type","application/json");

        for(int i = 0; i < 5; i++){
            String id = UUID.randomUUID().toString();
            Item newItem = new Item(id, "my name "+i, "my description "+i);
            HttpEntity<Item> itemEntity = new HttpEntity<>(newItem, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    createURLWithPort("/item"),
                    HttpMethod.PUT, itemEntity, String.class);
        }

        //create an empty body entity
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/items"),
                HttpMethod.GET, entity, String.class
        );

        JsonParser parser = new JsonParser();
        JsonObject jsonBody =  parser.parse(response.getBody()).getAsJsonObject();

        JsonArray data = jsonBody.getAsJsonArray("data");

        assertThat(5).isEqualTo(data.size());

        //verify the structure od the object at position 2
        JsonObject obj2 = data.get(1).getAsJsonObject();
        assertThat(obj2.has("name")).isTrue();
        assertThat(obj2.has("description")).isTrue();

    }

    @Test
    public void getItemTest(){

        headers.add("Content-type","application/json");

        //first add an item
        Item newItem = new Item("00000000-0000-0000-0000-000000000001", "my name", "my description");
        HttpEntity<Item> newEntity = new HttpEntity<>(newItem, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.PUT, newEntity, String.class);

        //now search for the only item in the list
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", "00000000-0000-0000-0000-000000000001");
        HttpEntity<JSONObject> itemEntity = new HttpEntity<JSONObject>(jsonObject, headers);

        response = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.POST, itemEntity, String.class);

        JsonParser parser = new JsonParser();
        JsonObject jsonBody =  parser.parse(response.getBody()).getAsJsonObject();

        JsonObject data = jsonBody.getAsJsonObject("data");
        String message = jsonBody.get("msg").getAsString();

        assertThat(data.has("id"));
        assertThat(data.get("id").getAsString()).contains("00000000-0000-0000-0000-000000000001");
        assertThat(message).contains("item with id 00000000-0000-0000-0000-000000000001 has been found");
    }

    /* disable this test because HttpURLConnection cannot use PATCH
    @Test
    public void verifyUpdates(){

        headers.add("Content-type","application/json");

        //first add an item
        Item newItem = new Item("00000000-0000-0000-0000-000000000001", "my name", "my description");
        HttpEntity<Item> newEntity = new HttpEntity<>(newItem, headers);

        RestTemplate restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.PUT, newEntity, String.class);

        //modify the item with a Patch requests
        newItem.setId("11000000-0000-0000-0000-000000000011");
        newEntity = new HttpEntity<>(newItem, headers);
        ResponseEntity<String> response2 = restTemplate.exchange(
                createURLWithPort("/item"),
                HttpMethod.PATCH, newEntity, String.class);

        JsonParser parser = new JsonParser();
        JsonObject jsonBody =  parser.parse(response2.getBody()).getAsJsonObject();

        JsonObject data = jsonBody.getAsJsonObject("data");
        String message = jsonBody.get("msg").getAsString();

        assertThat(data.has("id"));
        assertThat(data.get("id").getAsString()).contains("11000000-0000-0000-0000-000000000011");

    }
    */


    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }


}
