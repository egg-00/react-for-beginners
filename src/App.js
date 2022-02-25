// import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [cost, setCost] = useState();
  const onChangeYourMoney = (event) => setMoney(event.target.value);
  const onChangeCoin = (event) => {
    setCost(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setMoney(1);
        setCost(1);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <input
        type="number"
        value={money}
        onChange={onChangeYourMoney}
        placeholder="Write your money"
      ></input>
      <input
        type="number"
        // value={parseInt(money) / parseInt(cost)}
        value={Math.round(money / cost)}
        // onChange={onChange}
        // placeholder="Write your money"
        disabled
      ></input>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeCoin}>
          <option>Select your coins!</option>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
