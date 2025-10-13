import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonProgressBar, IonList, IonItem, IonLabel, IonText, IonIcon, IonInput } from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import './Quiz.css';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  imageUrl?: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Welk bakje gebruik je voor plastic verpakkingen?',
    options: ['Restafval', 'PMD', 'GFT', 'Glas'],
    correctIndex: 1,
    explanation: 'PMD staat voor Plastic, Metalen verpakkingen en Drankenkartons en is de juiste plek voor plastic verpakkingen.'
  , imageUrl: 'https://images.unsplash.com/photo-1581578731386-0a1f3c2b9e4d?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    text: 'Waar hoort een lege glazen pot?',
    options: ['PMD', 'GFT', 'Glas', 'Restafval'],
    correctIndex: 2,
    explanation: 'Glas hoort in de glascontainer; zorg dat deksel en pot gescheiden zijn als dat gevraagd wordt.'
  , imageUrl: 'https://images.unsplash.com/photo-1592928309149-5b4b3a9d2b6b?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    text: 'Wat hoort in de GFT-container?',
    options: ['GFT', 'PMD', 'Restafval', 'Glas'],
    correctIndex: 0,
    explanation: 'GFT is voor groente-, fruit- en tuinafval zoals schillen en etensresten.'
  , imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 4,
    text: 'Waar gooi je batterijen?',
    options: ['KCA / Inzamelpunt', 'PMD', 'GFT', 'Glas'],
    correctIndex: 0,
    explanation: 'Batterijen bevatten schadelijke stoffen en horen niet in het restafval maar bij speciale inzamelpunten.'
  , imageUrl: 'https://images.unsplash.com/photo-1592928309149-5b4b3a9d2b6b?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 5,
    text: 'Waar hoort een leeg melk- of sapkarton (Tetra Pak)?',
    options: ['PMD', 'Glas', 'GFT', 'Restafval'],
    correctIndex: 0,
    explanation: 'Lege drinkpakken horen bij PMD omdat ze vaak uit meerdere lagen bestaan maar als verpakking worden ingezameld.'
  , imageUrl: 'https://images.unsplash.com/photo-1564758866815-29eb7d2f8b0e?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 6,
    text: 'Waar hoort een kapot keramisch bord?',
    options: ['Glas', 'Restafval', 'GFT', 'PMD'],
    correctIndex: 1,
    explanation: 'Keramiek hoort in het restafval; het kan niet bij glas en niet bij PMD.'
  , imageUrl: 'https://images.unsplash.com/photo-1605902711622-cfb43c44367e?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 7,
    text: 'Wat doe je met oliën en frituurvet?',
    options: ['Inzamelpunt / Afvalstation', 'Giet in de gootsteen', 'GFT', 'PMD'],
    correctIndex: 0,
    explanation: 'Oliën en vetten kun je beter verzamelen en naar een inzamelpunt brengen of in gesloten verpakking bij restafval doen — niet in de gootsteen.'
  , imageUrl: 'https://images.unsplash.com/photo-1606312619344-1a5c3f8b1b1b?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 8,
    text: 'Moet je plastic verpakkingen altijd schoon maken?',
    options: ['Ja (licht afspoelen)', 'Nee', 'Alleen bij glas', 'Altijd'],
    correctIndex: 0,
    explanation: 'Korte naspoeling is voldoende; grote vervuiling kan wel bij het restafval horen.'
  , imageUrl: 'https://images.unsplash.com/photo-1581578731386-0a1f3c2b9e4d?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 9,
    text: 'Waar laat je een lege deodorantbus het beste?',
    options: ['PMD', 'Glas', 'GFT', 'Restafval'],
    correctIndex: 0,
    explanation: 'Lege metalenspuitbussen horen bij PMD (plastic/metal).',
  imageUrl: 'https://images.unsplash.com/photo-1600180758891-3bf1e8b7f5f6?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 10,
    text: 'Wat doe je met kapotte elektrische apparaten?',
    options: ['Restafval', 'Milieupark / Inzamelpunt', 'Glas', 'GFT'],
    correctIndex: 1,
    explanation: 'Kleine elektrische apparaten lever je in bij het inzamelpunt of winkel met terugname.',
  imageUrl: 'https://images.unsplash.com/photo-1574530710517-2931c0ec9f3a?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 11,
    text: 'Waar hoort een lege aluminiumfolie?',
    options: ['PMD', 'Glas', 'Restafval', 'GFT'],
    correctIndex: 0,
    explanation: 'Aluminium hoort bij PMD omdat het een metalen verpakking is.',
  imageUrl: 'https://images.unsplash.com/photo-1574530710517-2931c0ec9f3a?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 12,
    text: 'Hoe moet je een melkpak leegmaken voor recycling?',
    options: ['Leeg en plat maken', 'Vol laten', 'In stukken scheuren', 'In de vriezer bewaren'],
    correctIndex: 0,
    explanation: 'Leeg en plat maken bespaart ruimte en is meestal voldoende voor PMD.',
  imageUrl: 'https://images.unsplash.com/photo-1564758866815-29eb7d2f8b0e?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 13,
    text: 'Mag bakolie in de GFT-container?',
    options: ['Nee — naar inzamelpunt of bij restafval in afgesloten verpakking', 'Ja', 'Alleen als afgekoeld', 'Alleen verdund'],
    correctIndex: 0,
    explanation: 'Olie en vetten mogen niet in GFT of gootsteen; lever ze in bij inzamelpunt of doe in afgesloten verpakking bij restafval.',
  imageUrl: 'https://images.unsplash.com/photo-1606312619344-1a5c3f8b1b1b?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 14,
    text: 'Wat hoort niet in de PMD-zak?',
    options: ['Batterijen', 'Plastic flessen', 'Metaalblikken', 'Drankenkartons'],
    correctIndex: 0,
    explanation: 'Batterijen bevatten schadelijke stoffen en moeten apart worden ingezameld.',
  imageUrl: 'https://images.unsplash.com/photo-1581578731386-0a1f3c2b9e4d?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 15,
    text: 'Hoe behandel je voedselresten voor GFT?',
    options: ['GFT', 'Glas', 'PMD', 'Restafval'],
    correctIndex: 0,
    explanation: 'Voedselresten horen in de GFT-container; composteer ze of gebruik een GFT-bak.',
  imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'
  },
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const QUESTION_TIME = 10; // seconds per question

  const shuffleArray = <T,>(arr: T[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Create shuffled questions with shuffled options, mapping correctIndex
  const makeShuffledQuestions = () => {
    const base = shuffleArray(QUESTIONS);
    return base.map((q) => {
      const opts = shuffleArray(q.options.map((o, idx) => ({ o, idx })));
      const newIndex = opts.findIndex((x) => x.idx === q.correctIndex);
      return {
        ...q,
        options: opts.map((x) => x.o),
        correctIndex: newIndex,
      } as Question;
    });
  };

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(() => makeShuffledQuestions());
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  // initialize answers whenever questions are (re)shuffled
  useEffect(() => {
    const init: Record<number, number | null> = {};
    shuffledQuestions.forEach((q) => (init[q.id] = null));
    setAnswers(init);
  }, [shuffledQuestions]);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME); // seconds per question
  const [showExplanation, setShowExplanation] = useState(false);
  const history = useHistory();

  // Points per run
  const [runPoints, setRunPoints] = useState<number>(0);
  const [counted, setCounted] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);

  const currentQuestion = shuffledQuestions[current];

  // guard for safety when shuffledQuestions is empty
  useEffect(() => {
    if (!currentQuestion && shuffledQuestions.length > 0) setCurrent(0);
  }, [currentQuestion, shuffledQuestions]);

  const handleSelect = (optionIndex: number) => {
    // prevent selecting after answered
    if (answers[currentQuestion.id] !== null) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    // award points immediately if correct and not yet counted
    const alreadyCounted = counted[currentQuestion.id];
    if (!alreadyCounted && optionIndex === currentQuestion.correctIndex) {
      setRunPoints((p) => p + 10);
      setCounted((c) => ({ ...c, [currentQuestion.id]: true }));
    }
    // show explanation immediately and schedule advance
    setShowExplanation(true);
    clearAdvance();
    scheduleAdvance(1200);
  };

  const clearAdvance = () => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  };

  const scheduleAdvance = (delay = 1200) => {
    clearAdvance();
    advanceTimeoutRef.current = window.setTimeout(() => {
      advanceTimeoutRef.current = null;
      if (current < shuffledQuestions.length - 1) {
        setCurrent((c) => c + 1);
        setTimeLeft(QUESTION_TIME);
        setShowExplanation(false);
      } else {
        setFinished(true);
      }
    }, delay) as unknown as number;
  };

  const next = () => {
    // move to next question or finish
    clearAdvance();
    if (current < shuffledQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(QUESTION_TIME);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const score = shuffledQuestions.reduce((acc, q) => {
    const a = answers[q.id];
    if (a === q.correctIndex) return acc + 1;
    return acc;
  }, 0);

  const restart = () => {
    // reshuffle questions and reset state
    const newShuffled = makeShuffledQuestions();
    setShuffledQuestions(newShuffled);
    const init: Record<number, number | null> = {};
    newShuffled.forEach((q) => (init[q.id] = null));
    setAnswers(init);
    setCurrent(0);
    setFinished(false);
    setRunPoints(0);
    setCounted({});
    setTimeLeft(QUESTION_TIME);
    clearAdvance();
  };

  const back = () => {
    clearAdvance();
    if (current > 0) {
      setCurrent((c) => c - 1);
      setShowExplanation(false);
      setTimeLeft(QUESTION_TIME);
    }
  };

  // Badge logic: determine a badge name and emoji based on score
  const getBadgeForScore = (s: number) => {
    const total = shuffledQuestions.length;
    if (s === total) return { key: 'expert', name: 'Expert', emoji: '🏆', color: '#ffd700', desc: 'Perfecte score! Je bent een afvalscheidings-expert.' };
    if (s >= Math.max(1, Math.floor(total * 0.75))) return { key: 'advanced', name: 'Advanced', emoji: '🥇', color: '#e6b800', desc: 'Top gedaan — je snapt het heel goed.' };
    if (s >= Math.max(1, Math.floor(total * 0.5))) return { key: 'intermediate', name: 'Intermediate', emoji: '🥈', color: '#c0c0c0', desc: 'Goed bezig — nog iets leren en je bent er.' };
    return { key: 'beginner', name: 'Beginner', emoji: '🌱', color: '#7fbf7a', desc: 'Een goede start — blijf oefenen!' };
  };

  const [earnedBadge, setEarnedBadge] = useState<{ key: string; name: string; emoji: string; color: string; desc: string } | null>(null);

  useEffect(() => {
    if (finished) {
      const badge = getBadgeForScore(score);
      setEarnedBadge(badge);
      try {
        const prevBest = Number(localStorage.getItem('gib_bestScore') ?? -1);
        if (score > prevBest) {
          localStorage.setItem('gib_bestScore', String(score));
          localStorage.setItem('gib_badge', JSON.stringify(badge));
        } else {
          // ensure badge stored even if best remains
          const stored = localStorage.getItem('gib_badge');
          if (stored) {
            const parsed = JSON.parse(stored);
            setEarnedBadge(parsed);
          }
        }
      } catch (e) {
        // ignore storage errors
      }
      // clear any scheduled timers/intervals when finished
      clearAdvance();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [finished]);

  const [playerName, setPlayerName] = useState('');

  const submitToLeaderboard = () => {
    const name = (playerName && String(playerName).trim()) ? String(playerName).trim() : 'Anoniem';
    try {
      const raw = localStorage.getItem('gib_leaderboard');
      const board = raw ? JSON.parse(raw) as Array<{ name: string; points: number; date: string }> : [];
      board.push({ name, points: runPoints, date: new Date().toISOString() });
      board.sort((a, b) => b.points - a.points);
      localStorage.setItem('gib_leaderboard', JSON.stringify(board));
      // also update total points optionally
      const totalRaw = Number(localStorage.getItem('gib_totalPoints') ?? 0);
      localStorage.setItem('gib_totalPoints', String(totalRaw + runPoints));
      // dispatch an event so leaderboard page can refresh if it's already mounted
      try { window.dispatchEvent(new CustomEvent('gib_leaderboard_updated')); } catch (e) { /* ignore */ }
      // navigate to leaderboard
      history.push('/tab3');
    } catch (e) {
      // ignore
    }
  };

  // Timer effect per question
  useEffect(() => {
    if (finished) return;
    // stop timer if answered or paused
    if (answers[currentQuestion.id] !== null || paused) return;

    // clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // mark as unanswered (timeout) so explanation shows
          setAnswers((prevAns) => ({ ...prevAns, [currentQuestion.id]: prevAns[currentQuestion.id] ?? null }));
          setShowExplanation(true);
          // schedule advance (centralized)
          scheduleAdvance(1200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000) as unknown as number;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [current, finished, answers, paused]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quiz Afvalscheiding</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Leer afval scheiden — vraag {current + 1} van {shuffledQuestions.length}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ marginBottom: 12 }}>
              <IonProgressBar value={(current + (finished ? 1 : 0)) / shuffledQuestions.length} />
            </div>
            <div className="timer-bar" aria-hidden>
              <div className="timer-fill" style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }} />
            </div>

            {!finished ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ marginTop: 0 }}>{currentQuestion.text}</h3>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 14, color: '#556' }}>{timeLeft}s</div>
                    <IonButton size="small" onClick={() => {
                      setPaused((p) => {
                        const newP = !p;
                        if (newP) {
                          // paused now -> clear interval and any scheduled advance
                          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
                          clearAdvance();
                        } else {
                          // resumed -> reset timeLeft to continue counting
                          setTimeLeft((t) => Math.max(1, t));
                        }
                        return newP;
                      });
                    }}>{paused ? 'Resume' : 'Pauze'}</IonButton>
                  </div>
                </div>
                {currentQuestion.imageUrl && (
                  <div style={{ margin: '10px 0' }}>
                    <img src={currentQuestion.imageUrl} alt="illustratie" style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }} />
                  </div>
                )}
                <IonList>
                  {currentQuestion.options.map((opt, idx) => {
                    const selected = answers[currentQuestion.id] === idx;
                    const isAnswered = answers[currentQuestion.id] !== null;
                    const isCorrect = isAnswered && idx === currentQuestion.correctIndex;
                    const isWrong = isAnswered && selected && !isCorrect;
                    return (
                      <IonItem
                        key={idx}
                        button
                        lines="none"
                        className={`option-item ${selected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                        onClick={() => { if (!isAnswered) handleSelect(idx); }}
                      >
                        <IonLabel>{opt}</IonLabel>
                        {isCorrect && <IonIcon icon={checkmarkCircle} className="option-icon correct" />}
                        {isWrong && <IonIcon icon={closeCircle} className="option-icon wrong" />}
                      </IonItem>
                    );
                  })}
                </IonList>

                {showExplanation || answers[currentQuestion.id] !== null ? (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 0.95 + 'rem', color: '#334' }}><strong>Uitleg:</strong> {currentQuestion.explanation}</div>
                  </div>
                ) : null}

                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <IonButton onClick={back} disabled={current === 0}>Terug</IonButton>
                  <IonButton onClick={() => {
                    if (!showExplanation && answers[currentQuestion.id] !== null) {
                      setShowExplanation(true);
                      // auto advance after brief delay
                      setTimeout(() => {
                        if (current < shuffledQuestions.length - 1) {
                          setCurrent((c) => c + 1);
                          setTimeLeft(QUESTION_TIME);
                          setShowExplanation(false);
                        } else {
                          setFinished(true);
                        }
                      }, 1200);
                    } else {
                      next();
                    }
                  }} disabled={!(showExplanation || answers[currentQuestion.id] !== null)}>{current < shuffledQuestions.length - 1 ? (showExplanation ? 'Volgende' : 'Toon uitleg') : (showExplanation ? 'Bekijk resultaat' : 'Toon uitleg')}</IonButton>
                </div>
              </div>
            ) : (
              <div>
                <h3>Resultaat</h3>
                  <p><strong>Score: {score} / {shuffledQuestions.length}</strong></p>
                  <p><strong>Punten deze ronde: {runPoints}</strong></p>
                <IonList>
                  {shuffledQuestions.map((q, idx) => (
                    <IonItem key={q.id} lines="full">
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <IonText><strong>{idx + 1}. {q.text}</strong></IonText>
                          <IonText color={answers[q.id] === q.correctIndex ? 'success' : 'danger'}>
                            {answers[q.id] === q.correctIndex ? 'Juist' : 'Fout'}
                          </IonText>
                        </div>
                        <div style={{ marginTop: 6 }}>
                          <small>Juiste antwoord: {q.options[q.correctIndex]}</small>
                        </div>
                        {q.explanation && (
                          <div style={{ marginTop: 6 }}>
                            <small>{q.explanation}</small>
                          </div>
                        )}
                      </div>
                    </IonItem>
                  ))}
                </IonList>

                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <IonButton onClick={restart}>Opnieuw proberen</IonButton>
                  <IonButton color="tertiary" onClick={() => { restart(); history.push('/tab1'); }}>Terug naar Home</IonButton>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ marginBottom: 8 }}>
                    <small>Wil je je punten bewaren op het leaderboard? Vul je naam in:</small>
                  </div>
                  <IonInput
                    placeholder="Je naam"
                    value={playerName}
                    onIonChange={(e) => setPlayerName(String(e.detail.value ?? ''))}
                    onIonInput={(e: any) => setPlayerName(String(e.target?.value ?? e.detail?.value ?? ''))}
                  />
                  <div style={{ marginTop: 8 }}>
                    <IonButton color="secondary" onClick={submitToLeaderboard}>Opslaan op leaderboard</IonButton>
                  </div>
                </div>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
