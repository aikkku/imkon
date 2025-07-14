from openai import OpenAI

# Your API key
api_key = "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"

# Create OpenAI client
client = OpenAI(api_key=api_key)

try:
    print("Testing OpenAI API...")
    print(f"API Key starts with: {api_key[:10]}...")
    
    # Test with a simple request
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": "Say hello in Uzbek"}
        ],
        max_tokens=50
    )
    
    print("✅ Success!")
    print(f"Response: {completion.choices[0].message.content}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print(f"Error type: {type(e).__name__}") 