import type { GamePhase, GameState }        from "../game/uiTypes";
import { el, text }                         from "../../home";
import { GameController }                   from "../controller";
import { pongAlert }                        from "../../utils/alertBox.ts"
import { areBothPlayersRegistered }         from "./players";

export class domOverlayManager {
    private gameController: GameController;
    public countdownTimerId: number | null = null;
    public countdownLeft: number = 3;

    constructor(gameController: GameController) {
        this.gameController = gameController;
    }

    public bindHTMLElement(phase: GamePhase, state: GameState): HTMLElement {
        switch (phase) {
            case "START": {
                const b = el("button", "btn-click");
                b.textContent = "START";
                b.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (areBothPlayersRegistered(state)) {
                        this.gameController.setPhase("WAITING");
                    } else {
                        pongAlert("Both players must be set before starting the game.");
                    }
                });
                return b;
            }
            case "WAITING": {
            const wrap = el("div", "isolate text-center flex flex-col items-center gap-3 font-modern-type");

            // Titre / consigne
            const lbl = el("div", "text-xl");
            lbl.append(text("Press to start"));

            const hint = el("div", "text-sm opacity-100");
            hint.append(text("Each player: press your start key"));

            // Ligne P1 / P2
            const row = el("div", "mt-2 flex items-start justify-center gap-10");

            function playerBlock(pid: "p1" | "p2", title: string, imgSrc: string, ready: boolean): HTMLElement {
                const col = el("div", "flex flex-col items-center gap-2");

                const pLbl = el("div", "text-sm font-bold tracking-wide");
                pLbl.append(text(title));

                const imgWrap = el("div", `bg-none p-2`);

                const img = el(
                "img",
                `h-16 w-auto block select-none pointer-events-none
                mix-blend-multiply ${ready ? "opacity-100" : "opacity-25"} transition-opacity duration-200`
                ) as HTMLImageElement;
                img.src = imgSrc;
                img.alt = `${title} start keys`;

                imgWrap.append(img);
                col.append(pLbl, imgWrap);

                const status = el("div", `text-xs ${ready ? "opacity-90" : "opacity-60"}`);
                status.append(text(ready ? "✅" : "❌"));
                col.append(status);

                return col;
            }

            const p1 = playerBlock("p1", "P1", "/imgs/w.png", !!state.ready.p1);
            const p2 = playerBlock("p2", "P2", "/imgs/up.png", !!state.ready.p2);

            row.append(p1, p2);
            wrap.append(lbl, hint, row);

            return wrap;
            }
            case "COUNTDOWN": {
                const c = el("div", "text-9xl font-superretro pointer-events-none");
                c.textContent = String(this.countdownLeft ?? 3);
                return c;
            }
            case "PLAYING": {
                return el("div");
            }
            case "PAUSED": {
                const wrap = el("div", "text-center");
                const b1 = el("button", "btn-click");
                b1.textContent = "RESUME";
                b1.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.gameController.setPhase("COUNTDOWN");
                });
                
                // Only show RESTART button for non-tournament matches
                const isTournamentMatch = !!(state.tournamentCode || state.stats.tournamentCode);
                
                if (!isTournamentMatch) {
                    const b2 = el("button", "btn-click mt-2");
                    b2.textContent = "RESTART";
                    b2.addEventListener("click", (e) => {
                        e.stopPropagation();
                        this.gameController.setPhase("RESTART");
                    });
                    wrap.append(b1, b2);
                } else {
                    wrap.append(b1);
                }
                
                return wrap;
            }
            case "GAMEOVER": {
                const wrap = el("div", "text-center");
                const score = el("div", "font-superretro text-9xl mb-2");
                score.append(
                    text(`${state.stats.p1.score} - ${state.stats.p2.score}`)
                );
                
                // Only show RESTART button for non-tournament matches
                const isTournamentMatch = !!(state.tournamentCode || state.stats.tournamentCode);
                
                if (!isTournamentMatch) {
                    const b = el("button", "btn-click");
                    b.textContent = "RESTART";
                    b.addEventListener("click", (e) => {
                        e.stopPropagation();
                        this.gameController.setPhase("RESTART");
                    });
                    wrap.append(score, b);
                } else {
                    wrap.append(score);
                }
                
                return wrap;
            }
            case "SCORED": {
                const wrap = el("div", "text-center");
                const score = el("div", "font-superretro text-9xl mb-2");
                score.append(
                    text(`${state.stats.p1.score} - ${state.stats.p2.score}`)
                );

                wrap.append(score);
                return wrap;
            }
        }
        return el("div");
    }

    public gamingOverlayMode(canvas: HTMLCanvasElement, phase: GamePhase) {
        // Desactiver souris / clavier lors du jeu
        const isGameActive = (phase === "PLAYING" || phase === "COUNTDOWN");
        
        canvas.style.cursor = isGameActive ? "none" : "default";
        canvas.style.touchAction = isGameActive ? "none" : "auto";
    }

    public setCursorHidden(hidden: boolean): void {
        if (hidden) {
            document.body.classList.add("hide-cursor");
        }
        else {
            document.body.classList.remove("hide-cursor");
        }
    }
}

// Diagramme d’architecture des fonctions :  //
// interface    GameViewWindow------- main: HTMLElement;
//                                  - stage: HTMLElement;
//                                  - canvas: HTMLCanvasElement;
//                                  - terminal: HTMLElement;
//                                  - overlay: HTMLElement
//
// Class        domOverlayManager-------- private gameController: GameController
//  constructor                         - public countdownTimerId: number | null
//  domOverlayManager(GameController)   - public countdownLeft: number
//                                      - public bindHTMLElement(phase: GamePhase, state: GameState): HTMLElement
//                                      - public setCursorHidden(hidden: boolean): void
//
// Class        GameController------------------- public view: GameViewWindow
//  constructor                                 - public context: CanvasRenderingContext2D
//  GameController(opts: {                      - public state: GameState
//      context: CanvasRenderingContext2D;      - public domOverlay: domOverlayManager
//      view: GameViewWindow; })                - private loopCtrl: ReturnType<typeof GameLoop> | null
//                                              - public setPhase(phase: GamePhase): void
//                                              - private startPlaying(): void
//                                              - private pausePlaying(): void
//                                              - private startCountdown(): void
//                                              - private resetGame(): void
//                                              - private attachKeyboardInputs(): void
//                                              - public boot()
//
// Type Gamestate---------------- world:
//                              - ball
//                              - paddles
//                              - phase
//                              - ready
//                              - controls
//
// Type GamePhase = 'START' | 'WAITING' | 'COUNTDOWN' | 'PLAYING' | 'PAUSED' | 'GAMEOVER' | 'RESTART'
//
//
//
// Fonctionnement Global :
// createGameViewWindow()       Retourne une interface GameViewWindow qui contient les éléments HTML nécessaires pour le jeu.
// setupCanvas(view.canvas)     Il prend l'element HTMLCanvasElement et configure son contexte de rendu 2D, il retourne un CanvasRenderingContext2D. (le 'context')
// new GameController({         Crée une instance de GameController en lui passant le 'context' (CanvasRenderingContext2D) et la 'view' (GameViewWindow).
//     context: context,
//     view: view });
//
// Dans le Gamecontroller :     À la construction, il associe à ses propriétés, le contexte de rendu et la vue. Il initialise l'état du jeu, et crée un new domOverlayManager,
//                              qui prend une référence au GameController. Il cree egalement un loopCtrl, qui est un ReturnType de la fonction GameLoop ()
//
// La GameLoop() :              Elle est appellee une seule fois, via la fonction startPlaying() du GameController, qui est elle-même appelée lorsque le jeu passe en phase 'PLAYING'.
//                              Elle retourne une fonction "callback", definie dans le return de GameLoop(), qui est stockée dans la propriété loopCtrl du GameController.
//
// Dans le domOverlayManager :  La méthode bindHTMLElement(phase: GamePhase, state: GameState) retourne un élément HTML différent en fonction de la phase actuelle du jeu.
//                              C'est lui aussi qui "ecoute" les clics bouttons, et change la phase via setPhase() du GameController.








// // Types, interfaces et classes en synergie // //
// Voici comment ces concepts peuvent interagir de manière bénéfique :
//
// Types pour la sécurité des données : En utilisant des types, vous assurez que vos données sont correctement typées.
// Cela réduit les erreurs de type à l’exécution et améliore la lisibilité de votre code.

// Interfaces pour la structuration : Les interfaces définissent la forme des objets et des contrats. En les utilisant,
// vous définissez clairement ce que vous attendez des objets et créez une documentation en temps réel pour les développeurs qui travaillent
// avec votre code.

// Classes pour l’encapsulation et la modélisation : Les classes vous permettent de créer des structures de données complexes
// en encapsulant la logique et les données. Elles rendent votre code modulaire, réutilisable et maintenable.