#include <iostream>

int main()
{
    int limit = 1000000000;
    clock_t start, end;
    start = clock();
    for (int i = 0; i < limit; limit++)
    {
    }
    end = clock();
    double duration = (double)(end - start) / double(CLOCKS_PER_SEC);
    std::cout
        << "cpp looped 1000000000 times in " << duration << " seconds" << std::endl;
    return 0;
}