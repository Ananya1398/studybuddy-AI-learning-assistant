import nltk
from sentence_transformers import SentenceTransformer, util
from transformers import T5ForConditionalGeneration, T5Tokenizer

nltk.download('punkt')

model = SentenceTransformer('all-MiniLM-L6-v2')
tokenizer = T5Tokenizer.from_pretrained('t5-small', legacy=False)
t5_model = T5ForConditionalGeneration.from_pretrained('t5-small')


def generate_summary(title, document, num_sentences=5):
    sentences = nltk.sent_tokenize(document)

    if len(sentences) == 0:
        return "No valid sentences to summarize."

    title_embedding = model.encode(title, convert_to_tensor=True)
    sentence_embeddings = model.encode(sentences, convert_to_tensor=True)

    similarity_scores = util.pytorch_cos_sim(title_embedding, sentence_embeddings)[0]

    ranked_sentences = sorted(
        [(score.item(), sentence) for score, sentence in zip(similarity_scores, sentences)],
        key=lambda x: x[0],
        reverse=True
    )

    selected_sentences = [sentence for _, sentence in ranked_sentences[:num_sentences]]

    def paraphrase(sentence):
        input_text = f"paraphrase: {sentence}"
        input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=256,
                                     truncation=True)

        outputs = t5_model.generate(
            input_ids, max_length=256, num_beams=4, early_stopping=True
        )

        if outputs is None or len(outputs) == 0:
            return sentence

        result = tokenizer.decode(outputs[0], skip_special_tokens=True)

        if result.lower() == "false" or result == "":
            return sentence

        return result

    paraphrased_sentences = [
        paraphrase(sentence) for sentence in selected_sentences
    ]

    print("\n=== Paraphrased Sentences ===")
    for idx, sent in enumerate(paraphrased_sentences, 1):
        print(f"{idx}. {sent}")

    if paraphrased_sentences:
        input_text = "summarize: " + " ".join(paraphrased_sentences)
        input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=512,
                                     truncation=True)

        outputs = t5_model.generate(
            input_ids, max_length=512, num_beams=4, early_stopping=True
        )
        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

        print("\n=== Generated Summary ===")
        print(summary)
    else:
        summary = "Summary generation failed due to insufficient data."

    return summary


title = "Lecture Transcript on Machine Learning Basics"
document = """
Alright, everyone, welcome to today’s lecture on the basics of machine learning. Machine learning, as you probably know, is a field of artificial intelligence that focuses on building systems that can learn from data and improve their performance over time without being explicitly programmed for every task. Now, to really understand machine learning, you need to understand the difference between supervised, unsupervised, and reinforcement learning — the three core types of machine learning.

Let’s start with supervised learning. In supervised learning, the model is trained on a labeled dataset, which means that each input comes with a corresponding output. For example, if you're building a spam filter, you might train the model using emails marked as "spam" or "not spam." The model learns to recognize patterns that distinguish spam from regular emails. Common algorithms used in supervised learning include linear regression, logistic regression, support vector machines, and neural networks.

Now, in contrast, unsupervised learning involves working with unlabeled data. The model tries to identify hidden patterns or structures without knowing the correct output. A good example of this is clustering. Suppose you have customer data, and you want to group similar customers based on their purchasing behavior. The model might discover that there are, say, three main customer types — high spenders, occasional buyers, and discount seekers — without any explicit labels. Algorithms like K-means clustering and principal component analysis (PCA) are common here.

The third type is reinforcement learning. This is where an agent learns by interacting with an environment and receiving rewards or penalties based on its actions. Think of a robot trying to navigate a maze. Every time it takes a correct step, it receives a reward; if it bumps into a wall, it gets a penalty. Over time, the robot learns the best strategy to maximize its total reward. Reinforcement learning is used in areas like robotics, game playing (like AlphaGo), and autonomous driving.

Now, a key part of machine learning is the concept of overfitting and underfitting. Overfitting happens when your model learns the training data too well — including the noise — and fails to generalize to new data. Underfitting, on the other hand, happens when your model is too simple and fails to capture the underlying patterns. You can think of overfitting as memorizing answers to a test rather than understanding the material, while underfitting is like not studying enough and getting every question wrong.

One way to prevent overfitting is through regularization. L1 and L2 regularization methods add a penalty to the model's complexity, encouraging it to find a simpler solution. Another technique is cross-validation, where you split your dataset into training and validation sets to test how well the model generalizes.

So to wrap up: machine learning is all about building models that learn from data. Supervised learning relies on labeled data, unsupervised learning discovers patterns in unlabeled data, and reinforcement learning learns from rewards. Avoid overfitting and underfitting through regularization and cross-validation, and remember that high-quality data and effective feature engineering can make or break your model’s performance.
"""

summary = generate_summary(title, document)

