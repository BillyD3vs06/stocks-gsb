import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.list}>
        <li><a href="marknad.html">Marknad</a></li>
        <li><a href="kop-salj.html">Köp/Sälj</a></li>
        <li><a href="nyheter.html">Nyheter</a></li>
        <li><a href="telegram-bot.html">Telegram bot</a></li>
        <li><a href="login-signup.php">LogIn/SignUp</a></li>
        <li><a href="about-us.html">About Us</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "white",
    border: "1px solid black",
    padding: "10px"
  },
  list: {
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none",
    margin: 0,
    padding: 0
  }
};

export default NavBar;
