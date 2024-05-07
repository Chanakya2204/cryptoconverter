import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import { GiCoins } from "react-icons/gi";

function Converter() {
  const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';
  const defaultFirstselectvalue = "bitcoin";
  const defaultsecondselectvalue = "Ether";

  const [cryptolist, setcryptolist] = useState([]);
  const [inputValue, setinputValue] = useState("0");
  const [firstselect, setfirstselect] = useState(defaultFirstselectvalue);
  const [secondselect, setsecondselect] = useState(defaultsecondselectvalue);
  const [result, setresult] = useState("0");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      const data = jsonData.rates;
      const tempArray = Object.entries(data).map(item => ({
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value
      }));
      setcryptolist(tempArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (cryptolist.length === 0) return;

    const firstselectrate = cryptolist.find(item => item.value === firstselect)?.rate || 0;
    const secondselectRate = cryptolist.find(item => item.value === secondselect)?.rate || 0;

    const resultvalue = (inputValue * secondselectRate) / firstselectrate;
    setresult(resultvalue.toFixed(6));
  }, [inputValue, firstselect, secondselect, cryptolist]);

  return (
    <div className="container">
      <Card className="crypto-card" title={<h1><GiCoins />   Crypto-Converter</h1>}>
        <Form size="large">
          <Form.Item>
            <Input onChange={(event) => setinputValue(event.target.value)} />
          </Form.Item>
        </Form>

        <div className="select-box">
          <Select style={{ width: "160px" }} defaultValue={defaultFirstselectvalue} options={cryptolist} onChange={(value) => setfirstselect(value)} />
          <Select style={{ width: "160px" }} defaultValue={defaultsecondselectvalue} options={cryptolist} onChange={(value) => setsecondselect(value)} />
        </div>
        <p> {inputValue}{firstselect}={result}{secondselect}</p>
      </Card>
    </div>
  );
}

export default Converter;
