import os
from langchain_anthropic import ChatAnthropic
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from langchain import hub

# Initialize Claude model
llm = ChatAnthropic(
    model="claude-sonnet-4-5-20250929",
    api_key= os.environ.get("ANTHROPIC_API_KEY")
)

# The master ingrediant mixer.
def masterchef(text: str) -> str:
    """A recipe suggestor."""
    return f"Echo: {text}"

tools = [
    Tool(
        name="masterchef",
        func=masterchef,
        description="""Takes in a listen of food items, spices, or raw materials.
                        using this list, the agent will propose things that can be made
                        for a meal. It focuses on a single dinner item or deesert. It does
                        not respond anything otuside of recipes. if it is close to being able to 
                        make a recipe but is missing a key ingreadiant, it can suggest to get one thing"""
    )
]

# Get the ReAct prompt from LangChain hub
prompt = hub.pull("hwchase17/react")

# Create the agent
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Agent entry point
def start_agent():
    user_input = input("What's in your kitchen? ")
    run_agent(user_input)

def run_agent(input_text: str):
    """
    Takes in a listen of food items, spices, or raw materials.
    and makes a meal recommendation
    
    Args:
        input_text: A list of the food items the person is in possession of
    """
    print(f"\n{'='*50}")
    print(f"Input: {input_text}")
    print(f"{'='*50}\n")
    
    # Run the agent
    response = agent_executor.invoke({"input": input_text})
    
    print(f"\n{'='*50}")
    print(f"Response: {response['output']}")
    print(f"{'='*50}\n")
    
    return response['output']
