var desiredMaxLength = 10
var randomNumber = '';
for (var i = 0; i < desiredMaxLength; i++) {
    randomNumber += Math.floor(Math.random() * 10);
}
return randomNumber;