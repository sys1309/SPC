function sum_to_100(number) {
    let sum = 0;
    for (i = 1; i <= number; i++){
        sum = sum + i 
    }
    console.log(`${number} 까지의 합은 ${sum}`);
}

sum_to_100(10);