#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/resource.h>
#define NUM_PROCESSES 8
void service() {
    char* command = "nodemon app.js";
    if (system(command) != 0) {
        fprintf(stderr, "Error executing app.js\n");
        exit(1);
    }
}
void log(const char* message) {
    printf("%s\n", message);
}
void trackmemory() {
    struct rusage usage;
    if (getrusage(RUSAGE_SELF, &usage) == -1) {
        fprintf(stderr, "Error tracking memory usage\n");
        return;
    }
    long memoryUsage = usage.ru_maxrss; 
    char message[100];
    sprintf(message, "Memory usage: %ld KB", memoryUsage);
    logMessage(message);
}
int main() {
    pid_t pid[NUM_PROCESSES];
    for (int i = 0; i < NUM_PROCESSES; i++) {
        pid[i] = fork();
        if (pid[i] < 0) {
            fprintf(stderr, "Error forking process\n");
            exit(1);
        } else if (pid[i] == 0) {
            service();
            exit(0);
        }
    }
    for (int i = 0; i < NUM_PROCESSES; i++) {
        waitpid(pid[i], NULL, 0);
    }
    trackmemory();
    log("All app.js processes completed.");

    return 0;
}
