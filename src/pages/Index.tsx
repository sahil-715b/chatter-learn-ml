
import React, { useState } from 'react';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    content: "Machine Learning (ML) is a subset of artificial intelligence that provides systems the ability to learn from data and improve from experience without being explicitly programmed. It's revolutionizing industries by enabling computers to make predictions, recognize patterns, and automate decision-making processes. ML algorithms can identify trends in massive datasets that would be impossible for humans to detect manually."
  },
  {
    id: 2,
    title: "Types of Machine Learning (Supervised, Unsupervised, Reinforcement)",
    content: "ML is divided into three main categories: Supervised Learning, where models learn from labeled data to make predictions on new, unseen data; Unsupervised Learning, which finds hidden patterns and structures in data without labeled examples; and Reinforcement Learning, which learns optimal actions through trial and error by interacting with an environment and receiving rewards or penalties."
  },
  {
    id: 3,
    title: "Applications of ML in real-world",
    content: "ML powers countless applications in our daily lives: recommendation systems on Netflix and Amazon that suggest content based on your preferences, fraud detection systems in banking that identify suspicious transactions, autonomous vehicles that navigate roads safely, chatbots that provide customer support, medical diagnosis tools that help doctors identify diseases, and search engines that deliver relevant results instantly."
  },
  {
    id: 4,
    title: "Differences: ML vs. AI vs. DL vs. Data Science",
    content: "Understanding the relationships between these fields is crucial: AI (Artificial Intelligence) is the broad field focused on creating intelligent machines that can perform tasks requiring human-like intelligence. ML (Machine Learning) is a subset of AI that enables systems to learn from data. Deep Learning (DL) is a subset of ML that uses neural networks with multiple layers. Data Science is an interdisciplinary field that uses ML, statistics, and domain expertise for data analysis, prediction, and insight extraction."
  },
  {
    id: 5,
    title: "Data Collection",
    content: "The foundation of any successful ML project is quality data. Data collection involves systematically gathering relevant information from various sources including sensors (IoT devices, cameras), surveys and questionnaires, APIs from third-party services, databases, web scraping, and user interactions. The key is ensuring the data is representative, unbiased, and sufficient in quantity for the problem you're trying to solve."
  },
  {
    id: 6,
    title: "Data Cleaning",
    content: "Data cleaning is often the most time-consuming yet critical step in ML workflows. It involves removing duplicate records, handling missing values through imputation or removal, fixing inconsistencies in formatting and naming conventions, identifying and dealing with outliers, and standardizing data types. Clean data ensures your models learn meaningful patterns rather than noise, leading to better performance and more reliable predictions."
  },
  {
    id: 7,
    title: "Feature Selection",
    content: "Feature selection is the process of choosing the most relevant variables (features) that contribute to your model's predictive power. Good feature selection improves model accuracy, reduces overfitting, decreases computational complexity, and makes models more interpretable. Techniques include statistical methods, correlation analysis, recursive feature elimination, and domain expertise to identify which features truly matter for your specific problem."
  }
];

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
    // Hide sidebar on mobile when article is selected
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleBackToList = () => {
    setShowSidebar(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Left Sidebar */}
      <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[30%] bg-white border-r border-gray-200 h-screen`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ML Learning Hub</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Article List */}
        <div className="flex-1 overflow-y-auto">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleSelect(article)}
              className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-100 border-l-4 ${
                selectedArticle?.id === article.id
                  ? 'bg-emerald-50 border-l-emerald-500'
                  : 'border-l-transparent'
              }`}
            >
              <h3 className="font-semibold text-gray-900 text-sm leading-relaxed">
                {article.title}
              </h3>
            </div>
          ))}
          
          {filteredArticles.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No articles found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area */}
      <div className={`${!showSidebar ? 'flex' : 'hidden'} md:flex flex-col flex-1 h-screen overflow-hidden`}>
        {/* Mobile Back Button */}
        {!showSidebar && (
          <div className="md:hidden p-4 bg-white border-b border-gray-200">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to articles</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedArticle ? (
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {selectedArticle.title}
                </h1>
              </div>

              {/* Article Content - Chat Bubble Style */}
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {selectedArticle.content}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-600 mb-2">
                  Select an article to start learning
                </h2>
                <p className="text-gray-400">
                  Choose from the topics on the left to begin your ML journey
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
