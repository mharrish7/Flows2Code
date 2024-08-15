import ollama


def query(prompt,lang):
    print(prompt)
    stream = ollama.chat(
        model='flowy',
        messages=[{'role': 'user', 'content': prompt + f".code in {lang}"}],
    )

    return stream["message"]["content"]

