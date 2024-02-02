import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class GPTController {

    private static final String OPENAI_URL = "https://api.openai.com/v1/engines/davinci/completions";
    private static final String OPENAI_API_KEY = "***************************";


    @PostMapping(value = "/query-gpt", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> queryGpt(@RequestBody Map<String, String> request) {
        String userInput = request.get("text");   RestTemplate restTemplate = new RestTemplate();

        GptRequest gptRequest = new GptRequest();
        gptRequest.setPrompt(userInput);
        gptRequest.setMaxTokens(150);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(OPENAI_API_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GptRequest> request = new HttpEntity<>(gptRequest, headers);

        try {

            ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, request, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error querying GPT-4");
        }
    }



}
