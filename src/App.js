// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect } from "react";
import { useState } from "react";

export default function UseEffectChallenge() {
  // & States Section
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [total, setTotal] = useState({});

  // ^ Effects Section
  useEffect(
    function () {
      const controller = new AbortController();
      async function getCurrency() {
        try {
          if (!amount || from === to) return;

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
            { signal: controller.signal }
          );
          const data = await res.json();

          setTotal(data);
          console.log(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(`You Have An Error While Fetching Data : ${err}`);
          }
        }
      }

      getCurrency();
      return function () {
        controller.abort();
      };
    },
    [amount, from, to]
  );
  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value !== "" ? Number(e.target.value) : "");
        }}
      />
      <select
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p style={{ marginTop: "15px", fontSize: "22px" }}>
        Total: {from !== to && amount ? total.rates?.[to].toFixed(2) : amount}
      </p>
    </div>
  );
}
