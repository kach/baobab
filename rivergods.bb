#lang s-exp "baobab.rkt"

(info
    #:name "We forgot the river gods."
    #:author "Joseph Parker"
    #:description "An adventure in 3 parts."
    #:start bank)

(define-register form "void")

(define-scene bank
    #:title
        "Among the reeds on the bank of the river."
    #:description
        "Cast off. Unwanted. Flotsom.  You can't put an exact world to it, but you understand why you are here, 
        floating among the reeds in the chilly muck"
    (link 'half-toad
        #:text
            "You are the forbidden offspring of woman and toad, 
            left to die in the river of your father."
        [goto underwater]
      ))


(define-scene underwater
  #:title
    "The fridgid depths of the river"
  #:description
    "But you don't die, do you?
    You slip below the surface of the river, thoughts and ambitions entering your mind.

    Why would they put you in the river?  You belong in the river, why did they cast you
    into your home?")
