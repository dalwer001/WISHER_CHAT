import React from 'react';
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

  const handleRefersh = () => {
    setPrompt("");
    setResult("");
    setLoading(false);
  }
  return (
    <main className="main">
      <div className='container'>
        <h4 className='text-bolder font-monospace text-center text-light text-uppercase header__wisher'>➡️Wisher⬅️</h4>
        <hr className='text-light border border-2 rounded' />
        <div className='mx-auto'>
          <div className='row mb-2'>
            <div className='col-md-12 col-sm-12 mt-5 align-items-center'>
              <div className="form-floating">
                <textarea
                  type='text'
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="form-control desc__details" placeholder="Write your wish 🤔" id="floatingTextarea2" >
                </textarea>
                <label for="floatingTextarea2">Write your wish 🤔</label>
              </div>
            </div>
            <div className='col-md-6 col-sm-6 mt-3 d-flex align-items-center'>
              <button
                onClick={handleClick}
                disabled={loading || prompt.length === 0}
                className='btn btn-outline-success btn-lg w-100 genBtn__style'>
                {loading ? <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : <span className='text-uppercase'>Genarate</span>}
              </button>
            </div>
            <div className='col-md-6 col-sm-6 mt-3 d-flex align-items-center'>
              <button
                onClick={handleRefersh}
                className='btn btn-outline-secondary btn-lg w-100 refBtn__style'>
                <span className='text-uppercase'>Refresh</span>
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
