#!/usr/bin/env racket
#lang racket
(require json)


(require (for-syntax syntax/parse))

(define world
    (make-hasheq
        (list
            (cons 'name        "Untitled")
            (cons 'author      "Anonymous")
            (cons 'description "Made with Baobab.")
            (cons 'version     "baobab-0.0.1")
            (cons 'start       "")
            (cons 'scenes      (make-hasheq))
            (cons 'registers   (make-hasheq)))))

(provide
        ; Include base racket
        (except-out
            (all-from-out racket)
             #%module-begin)

        info
        define-register
        define-scene
        link
        link*

        ; Required core utilities
        #%app #%datum #%top

        ; `main` method
        (rename-out [module-begin #%module-begin]))

(define-syntax-rule (module-begin expr ...)
    (#%module-begin
        expr ...
        (displayln (jsexpr->string world))))

(define-syntax-rule
    (info
        #:name name-
        #:author author-
        #:description description-
        #:start start-)
    (hash-set*! world
        'name name-
        'author author-
        'description description-
        'start (symbol->string (quote start-))))

(define-syntax-rule
    (define-register id val)
    (begin
        (hash-set!
            (hash-ref world 'registers)
            (quote id)
            val)
        (define id 'register)))

(define-syntax-rule
    (define-scene
        name
        #:title title-
        #:description description-
        .
        links-)
    (begin
        (define name
            (make-hasheq
                    (list
                        (cons 'title title-)
                        (cons 'description description-)
                        (cons 'links (list . links-)))))
        
        (hash-set!
            (hash-ref world 'scenes)
            (quote name) name)))

(define-syntax-rule
    (link*
        name-
        #:text text-
        #:present-if condition-
        .
        actions-)
        (make-hasheq
            (list
                (cons 'text text-)
               ;(cons 'condition (compile-bytecode (quote condition-)))
                (cons 'condition 123)
                (cons 'actions (compile-bytecode (quote actions-))))))

(define-syntax-rule
    (link
        name
        #:text text
        .
        actions)
    (link*
        name
        #:text text
        #:present-if true
        .
        actions))

(define (compile-bytecode bytecode)
    (map compile-instruction bytecode))

(define (compile-instruction instruction)
    (if (eq? (first instruction) 'goto)
        (list "goto" (symbol->string (second instruction)))
        (display "DEATH")))

; primitives:
;   goto-scene Scene
;   end-game
;   clear
;   section-break
;   display String
;   if Boolean Bytecode Bytecode
;   while Boolean Bytecode
;   wait Number
;   + - * / and or not

#|
[section-break]
[display "Ouch! That hurt."]
[set! health (- health (random))]
[if (< health 0)
    [(goto Hospital)]
    [(display "That could have been dangerous...")
     (goto House)]]
|#
