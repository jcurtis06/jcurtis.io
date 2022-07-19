---
title: Creating a Calculator
description: Learn to create an advanced calculator in Java.
slug: creating-a-calculator
date: "7-18-2022"
---
<!-- OPEN -->
Overview
------
Today we will be looking at how to create a simple calculator in the Java programming language.
You can view the source code <a href="https://github.com/jcurtis06/JavaCalculator" target="_blank">here.</a>
<!-- CLOSE -->

<!-- OPEN -->
About
------
The calculator will be somewhat advanced, being able to handle operations with parentheses.
<img src="https://i.ibb.co/cb6WyDh/calculator-demo.png" alt="calculator-demo" border="0" />
<!-- CLOSE -->

<!-- OPEN -->
Getting Started
------
First, create a new Java project in your IDE of choice. I personally use IntelliJ IDEA for Java projects, but the IDE you use will not affect this tutorial.
<!-- CLOSE -->

<!-- OPEN -->
Calculator Class
------
Inside the new project, go ahead and create a new `class` inside the `src` folder. Call it `Calculator.java`
<br />
<br />
Next, we're going to create a new method called `toRPN`, which stands for "To Reverse Polish Notation". Reverse Polish Notation (RPN) is a mathematical notation where the operators follow the operands.
<br />
<br />
For example, if the user were to enter the text "1 + 1 - 3", the `toRPN` function will convert that to "1 1 + 3 -". Reading RPN is pretty simple. When you encounter an operator, simply find the 2 numbers before it and add, subtract, multiply, etc. the numbers.
<br />
<br />
`1+1-3 => 1 1 + 3 - => 2 3 - => 1`
<br />
`1+(1-3) => 1 1 + 3 - => 2 3 - => -1`
<br />
<br />
So why use Reverse Polish Notation? Well, it's actually been proven to be faster than normal algebraic notation. It requires less memory to solve equations, and is simpler to implement as it doesn't require order of operations.
<!-- CLOSE -->

<!-- OPEN -->

toRPN Function
------
Inside the `toRPN` function, we have a variable storing the output (`out`) and a variable for storing symbols like `+, -, /, *, (, ),` etc.
<br />
<br />
We then loop through the equation (`e`), and, using a `switch` statement, perform the necessary transformations.
<br />
<br />
The first case we handle is an opening parenthesis. All we do is add it to the `symbols` list.
<br />
<br />
The next case is a closing parenthesis. Here, all we need to do is move *backwards* through our `symbols` list and add each symbol to our `out` list, then remove the symbol from the `symbols` list. The program does this until it has reached the opening parenthesis.
<br />
<br />
After that, we check for operators. First, we check if `symbols` has anything in it, and if it doesn't, we add the symbol to it. Otherwise, we check if the current symbol is of greater priority than the last using the `compare` method defined later.
<br />
<br />
If the `val` does not match any of those cases, it will simply add it to the `out` list.

<!-- CLOSE -->
```js
/*
This method takes in a LinkedList<String>, e.x: [1], [+], [1]
I'm using LinkedLists here because they're more efficient at
moving list nodes around, which we will be doing.
*/
private static LinkedList<String> toRPN(LinkedList<String> e) {
    LinkedList<String> symbols = new LinkedList<>();
    LinkedList<String> out = new LinkedList<>();

    // loop through the expresson (e)
    for (String val : e) {
        // if it's empty, then skip it.
        if (val.equals("")) continue;
        
        switch (val) {
            case "(" -> {
                // add it to the symbols
                symbols.add(val);
            }
            case ")" -> {
               /*
               We've encountered a ), now, we want to loop
               *backwards* through our symbols, adding each
               symbol to our new expression and removing it
               from the symbols array until we've reached
               the opening parenthesis.
               */
               boolean reachedOpening = false;

               while (!reachedOpening) {
                    /*
                    `pollLast()` returns the last item in the
                    LinkedList, then removes it.
                    */
                    String symbol = symbols.pollLast();
                    assert symbol != null;
                    if (symbol.equals("(")) reachedOpening = true;
                    else out.add(symbol);
               }
            }
            case "/", "+", "-", "x" -> {
                if (symbols.size() == 0) {
                    symbols.add(val);
                } else if (compare(val, symbols.getLast())) {
                    symbols.add(val);
                } else {
                    boolean notZero = symbols.size() > 0;
                    String last = symbols.getLast();
                    while (notZero && !compare(val, last)) {
                        out.add(symbols.pollLast());
                    }
                    symbols.add(val);
                }
            }
            default -> {
                out.add(val);
            }
        }
    }
    while(symbols.size()>0) out.add(symbols.pollLast());
    return out;
}
```

<!-- OPEN -->

`compare` Function
-----
This function is pretty difficult to explain... but I'll try my best. Essentially, the goal is to return a true/false value depending on whether or not the first symbol is of greater priority than the one before it (For example, `compare("+", "/"))` would return false). If the operators are of the same priority, then it will also return false.

<!-- CLOSE -->
```java
private static boolean compare(String current, String old) {
    if (old.equals("(")) return true;
    if (current.equals(old)) return false;
    else if ((current.equals("*")
        || current.equals("/")) && (old.equals("*")
        || old.equals("/"))) return false;
    else if ((current.equals("+")
        || current.equals("-")) && (old.equals("+")
        || old.equals("-"))) return false;
    else return (!current.equals("-") && !current.equals("+"))
        || (!old.equals("*") && !old.equals("/"));
}
```

<!-- OPEN -->

`calculate` Function
-----
Phew. The hard part is done. Now, we need to take the converted equation and solve it... but how? Well, thanks to RPN, it's now fairly easy to solve.

<!-- CLOSE -->
```java
public static String calculate(LinkedList<String> e) {
        LinkedList<String> rpnExpression = toRPN(e);

        for (int i=0; i<rpnExpression.size(); i++) {
            String val = rpnExpression.get(i);
            switch (val) {
                case "-" -> {
                    String calculated = String.valueOf(
                        Double.parseDouble(rpnExpression.get(i - 2)) 
                        - Double.parseDouble(rpnExpression.get(i - 1))
                    );
                    rpnExpression.set(i - 2, calculated);
                    rpnExpression.remove(i - 1);
                    rpnExpression.remove(i - 1);
                    i -= 2;
                }
                case "+" -> {
                    String calculated = String.valueOf(
                        Double.parseDouble(rpnExpression.get(i - 2)) 
                        + Double.parseDouble(rpnExpression.get(i - 1))
                    );
                    rpnExpression.set(i - 2, calculated);
                    rpnExpression.remove(i - 1);
                    rpnExpression.remove(i - 1);
                    i -= 2;
                }
                case "x" -> {
                    String calculated = String.valueOf(
                        Double.parseDouble(rpnExpression.get(i - 2)) 
                        * Double.parseDouble(rpnExpression.get(i - 1))
                    );
                    rpnExpression.set(i - 2, calculated);
                    rpnExpression.remove(i - 1);
                    rpnExpression.remove(i - 1);
                    i -= 2;
                }
                case "/" -> {
                    String calculated = String.valueOf(
                        Double.parseDouble(rpnExpression.get(i - 2)) 
                        / Double.parseDouble(rpnExpression.get(i - 1))
                    );
                    rpnExpression.set(i - 2, calculated);
                    rpnExpression.remove(i - 1);
                    rpnExpression.remove(i - 1);
                    i -= 2;
                }
            }
        }
        return rpnExpression.get(0);
    }
```

<!-- OPEN -->

Accepting Strings
-----
So the calculator itself is now finished. Let's make sure that it works properly. Let's make a overload function to convert a string into a `LinkedList` that'll work for our equation.
<!-- CLOSE -->

```java
public static String calculate(String expresson) {
    LinkedList<String> expression = new LinkedList<>();
    Collections.addAll(expression, expresson.split(" "));
    return calculate(expression);
}
```

<!-- OPEN -->

Testing
-----
In order to test the equation, create a new `main` method and print the output of the `calculate` method. As parameters, enter "( ( -6 + 2 ) / -3 x 4 - 5 )". The output should be `-1.3333333333333333`.
<!-- CLOSE -->

```java
public static void main(String[] args) {
    System.out.println(calculate("( ( -6 + 2 ) / -3 x 4 - 5 )"));
}
```

<!-- OPEN -->
Finish
-----
You did it! You now have a complete calculator made in Java. In the next part of this 2 part tutorial, I'll go over how to add a GUI using Java Swing.
<br />
<br />
<a>Part 2 (Coming Soon) →</a>
<!-- CLOSE -->