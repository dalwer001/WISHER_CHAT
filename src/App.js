import React, { useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import './App.css';

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [ln, setLn] = useState("english" || localStorage.setItem('ln', JSON.stringify("english")));
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 1500,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    JSON.parse(localStorage.getItem("ln")) === "japanese" ? setLn("japanese") : setLn("english");
  }, [ln]);

  const handleLanguageChanger = (e) => {
    console.log("E", e.target.value)
    if (e.target.value === "english") {
      setLn("english")
      localStorage.setItem('ln', JSON.stringify("english"));
    }
    else if (e.target.value === "japanese") {
      setLn("japanese")
      localStorage.setItem('ln', JSON.stringify("japanese"));
    } else {
      setLn("english")
      localStorage.setItem('ln', JSON.stringify("english"));
    }
  }

  console.log(JSON.parse(localStorage.getItem(("ln"))));
  const handleRefersh = () => {
    setPrompt("");
    setResult("");
    setLoading(false);
  }
  return (
    <main className={ln === "japanese" ? "jp_main" : "main"}>
      <div className='container'>
        <h4 className='text-bolder font-monospace text-center text-light text-uppercase header__wisher'>➡️{ln === "japanese" ? "ウィッシャー" : "Wisher"}⬅️</h4>
        <hr className='text-light border border-2 rounded' />
        <div className='row flex-row-reverse'>
          <div className="col-md-8 d-sm-none col-sm-12">
          </div>
          <div className="col-md-4 col-sm-12">
            <label className='text-dark fw-bold mb-1'>{ln === "japanese" ? "言語" : "Languages"}</label>
            <select class="form-select form-select-sm" aria-label=".form-select-lg example" name="languague_changer" value={ln} onChange={(e) => handleLanguageChanger(e)}>
              <option value="english">English</option>
              <option value="japanese">日本語</option>
            </select>
          </div>
        </div>
        <div className='mx-auto'>
          <div className='row mb-2'>
            <div className='col-md-12 col-sm-12 mt-3 align-items-center'>
              <div className="form-floating">
                <textarea
                  type='text'
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="form-control desc__details" placeholder="Ask way anything 🤔" id="floatingTextarea2" >
                </textarea>
                <label for="floatingTextarea2">{ln === "japanese" ? "何でも聞いてください" : "Ask away anything"} 🤔</label>
              </div>
            </div>
            <div className='col-md-6 col-sm-6 mt-3 d-flex align-items-center'>
              <button
                onClick={handleClick}
                disabled={loading || prompt.length === 0}
                className='btn btn-outline-success btn-lg w-100 genBtn__style'>
                {loading ? <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : <span className='text-uppercase'>{ln === "japanese" ? "生成する" : "Genarate"}</span>}
              </button>
            </div>
            <div className='col-md-6 col-sm-6 mt-3 d-flex align-items-center'>
              <button
                onClick={handleRefersh}
                className='btn btn-outline-secondary btn-lg w-100 refBtn__style'>
                <span className='text-uppercase'>{ln === "japanese" ? "リフレッシュする" : "Refresh"}</span>
              </button>
            </div>
            <div>

            </div>
          </div>
          <div className={result.length === 0 ? "" : "scrollable border-2 rounded  text-dark text-bold mb-2"}>
            <div dangerouslySetInnerHTML={{ __html: result }} className="mx-2 mt-2">
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
