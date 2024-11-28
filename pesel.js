<script>
        function validatePESEL(pesel) {
            if (pesel.length !== 11) {
                return false;
            }

            if (!/^\d{11}$/.test(pesel)) {
                return false;
            }

            return checkControlDigit(pesel);
        }

        function checkControlDigit(pesel) {
            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let sum = 0;

            for (let i = 0; i < 10; i++) {
                sum += parseInt(pesel.charAt(i), 10) * weights[i];
            }

            const controlDigit = (10 - (sum % 10)) % 10;

            return controlDigit === parseInt(pesel.charAt(10), 10);
        }

        function extractBirthDateFromPESEL(pesel) {
            const year = pesel.substring(0, 2);
            const month = pesel.substring(2, 4);
            const day = pesel.substring(4, 6);

            let fullYear = parseInt(year, 10) + 1900;
            let fullMonth = parseInt(month, 10);

            if (fullMonth > 12) {
                fullYear += 100; 
                fullMonth -= 20; 
            }

            const months = [
                "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
                "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
            ];

            const monthName = months[fullMonth - 1]; 

            return `${day} ${monthName} ${fullYear}`;
        }

        function extractGenderFromPESEL(pesel) {
            const genderDigit = parseInt(pesel.charAt(9), 10);
            return genderDigit % 2 === 0 ? "Kobieta" : "Mężczyzna";
        }

        function waliduj() {
            const pesel = document.getElementById("pesel").value;
            const wynik = document.getElementById("wynik");

            if (validatePESEL(pesel)) {
                const birthDate = extractBirthDateFromPESEL(pesel);
                const gender = extractGenderFromPESEL(pesel);

                wynik.innerHTML = `Data urodzenia: ${birthDate}<br>Płeć: ${gender}`;
            } else {
                wynik.innerHTML = "Niepoprawny numer PESEL!";
            }
        }
</script>