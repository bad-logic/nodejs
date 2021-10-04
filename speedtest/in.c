#include <stdio.h>
#include <time.h>

int main()
{
    int limit = 1000000000;
    clock_t start, end;
    start = clock();
    for (int i = 0; i < limit; limit++)
    {
    }
    end = clock();
    double duration = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("c looped 1000000000 time in %f seconds\n", duration);
    return 0;
}