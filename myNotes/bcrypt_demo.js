const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const password = "any string you want";
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(hashedPassword);

  const passwordsMatch = await bcrypt.compare("any strant", hashedPassword);
  console.log(passwordsMatch);
};

myFunction();
