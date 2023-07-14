package sys;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class service {
    public static void main(String[] args) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("nodemon", "app.js");
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            Thread.sleep(5000);  

            process.destroy();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
