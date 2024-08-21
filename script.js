document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const calculateButton = document.getElementById('calculate');
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');
    const stepsDiv = document.getElementById('steps');

    calculateButton.addEventListener('click', calculateExtendedGCD);

    function calculateExtendedGCD() {
        const a = parseInt(num1Input.value);
        const b = parseInt(num2Input.value);

        errorDiv.textContent = '';
        resultDiv.textContent = '';
        stepsDiv.innerHTML = '';

        if (isNaN(a) || isNaN(b)) {
            errorDiv.textContent = 'Please enter valid numbers.';
            return;
        }

        if (a === 0 && b === 0) {
            errorDiv.textContent = 'Both numbers cannot be zero.';
            return;
        }

        const steps = [];
        let [oldR, r] = [Math.abs(a), Math.abs(b)];
        let [oldS, s] = [1, 0];
        let [oldT, t] = [0, 1];

        steps.push(`Initial values:`);
        steps.push(`r = ${oldR}, s = ${oldS}, t = ${oldT}`);
        steps.push(`r = ${r}, s = ${s}, t = ${t}`);

        while (r !== 0) {
            const quotient = Math.floor(oldR / r);
            [oldR, r] = [r, oldR - quotient * r];
            [oldS, s] = [s, oldS - quotient * s];
            [oldT, t] = [t, oldT - quotient * t];

            steps.push(`\nQuotient q = ${quotient}`);
            steps.push(`r = ${oldR} - ${quotient} × ${r} = ${oldR - quotient * r}`);
            steps.push(`s = ${oldS} - ${quotient} × ${s} = ${oldS - quotient * s}`);
            steps.push(`t = ${oldT} - ${quotient} × ${t} = ${oldT - quotient * t}`);
        }

        const gcd = oldR;
        const x = oldS * (a < 0 ? -1 : 1);
        const y = oldT * (b < 0 ? -1 : 1);

        steps.push(`\nFinal result:`);
        steps.push(`GCD(${a}, ${b}) = ${gcd}`);
        steps.push(`${a}x + ${b}y = ${gcd}`);
        steps.push(`x = <strong>${x}</strong>, y = <strong>${y}</strong>`);

        displaySteps(steps);
        resultDiv.innerHTML = `The GCD of ${a} and ${b} is ${gcd}.<br>
                               Bézout's identity: ${a}x + ${b}y = ${gcd}<br>
                               where x = <strong>${x}</strong> and y = <strong>${y}</strong>`;
    }

    function displaySteps(steps) {
        steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.innerHTML = step;  // Changed from textContent to innerHTML to allow for <strong> tags
            stepElement.classList.add('step');
            if (step.startsWith('GCD(') || step.startsWith('x =')) {
                stepElement.classList.add('final-step');
            }
            if (step.includes('=')) {
                stepElement.classList.add('equation');
            }
            stepsDiv.appendChild(stepElement);
        });
    }
});
