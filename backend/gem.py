import google.generativeai as genai
import os
from config import key 

def query(code, prompt,lang):
    try:
        genai.configure(api_key=key)
        print(code + '\n give only the code that follows this given code. no explanations. ' + prompt + '. give code in language: ' + lang)
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(code + '\n give only the code that follows this given code. no explanations. ' + prompt + '. give code in language: ' + lang)

        return response.text
    except:
        return "rate limit :("

