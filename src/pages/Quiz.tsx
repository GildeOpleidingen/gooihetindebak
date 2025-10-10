import React, { useState, useEffect } from 'react';
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
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Welk bakje gebruik je voor plastic verpakkingen?',
    options: ['Restafval', 'PMD / Plastic bak', 'GFT', 'Glasbak'],
    correctIndex: 1,
    explanation: 'PMD staat voor Plastic, Metalen verpakkingen en Drankenkartons en is de juiste plek voor plastic verpakkingen.'
  },
  {
    id: 2,
    text: 'Waar hoort een lege glazen pot?',
    options: ['Plastic', 'GFT', 'Glascontainer', 'Restafval'],
    correctIndex: 2,
    explanation: 'Glas hoort in de glascontainer; zorg dat deksel en pot gescheiden zijn als dat gevraagd wordt.'
  },
  {
    id: 3,
    text: 'Wat hoort in de GFT-container?',
    options: ['Sinaasappelschillen', 'Batterijen', 'Kapotte mok', 'Plastic zak'],
    correctIndex: 0,
    explanation: 'GFT is voor groente-, fruit- en tuinafval zoals schillen en etensresten.'
  },
  {
    id: 4,
    text: 'Waar gooi je batterijen?',
    options: ['Batterij- en kleine chemie-inzamelpunt', 'PMD', 'GFT', 'Glas'],
    correctIndex: 0,
    explanation: 'Batterijen bevatten schadelijke stoffen en horen niet in het restafval maar bij speciale inzamelpunten.'
  },
  {
    id: 5,
    text: 'Mag je lege drinkpakken (Tetra Pak) bij PMD?',
    options: ['Ja, bij PMD', 'Nee, bij glas', 'Nee, bij GFT', 'Bij restafval'],
    correctIndex: 0,
    explanation: 'Lege drinkpakken horen bij PMD omdat ze vaak uit meerdere lagen bestaan maar als verpakking worden ingezameld.'
  },
  {
    id: 6,
    text: 'Waar hoort een kapot keramisch bord?',
    options: ['Glascontainer', 'Restafval', 'GFT', 'PMD'],
    correctIndex: 1,
    explanation: 'Keramiek hoort in het restafval; het kan niet bij glas en niet bij PMD.'
  },
  {
    id: 7,
    text: 'Wat doe je met oliën en frituurvet?',
    options: ['Giet in de gootsteen', 'Brengen naar inzamelpunt', 'Bij PMD', 'Bij GFT'],
    correctIndex: 1,
    explanation: 'Oliën en vetten kun je beter verzamelen en naar een inzamelpunt brengen of in gesloten verpakking bij restafval doen — niet in de gootsteen.'
  },
  {
    id: 8,
    text: 'Moet je plastic verpakkingen altijd schoon maken?',
    options: ['Ja, afspoelen is fijn', 'Nee, nooit', 'Alleen bij glas', 'Altijd in stukjes breken'],
    correctIndex: 0,
    explanation: 'Korte naspoeling is voldoende; grote vervuiling kan wel bij het restafval horen.'
  },
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);

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

  const [answers, setAnswers] = useState<Record<number, number | null>>(() => {
    const init: Record<number, number | null> = {};
    shuffleArray(QUESTIONS).forEach((q) => (init[q.id] = null));
    return init;
  });
  const [timeLeft, setTimeLeft] = useState<number>(20); // seconds per question
  const [showExplanation, setShowExplanation] = useState(false);
  const history = useHistory();

  // Points per run
  const [runPoints, setRunPoints] = useState<number>(0);
  const [counted, setCounted] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = shuffledQuestions[current];

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    // award points immediately if correct and not yet counted
    const alreadyCounted = counted[currentQuestion.id];
    if (!alreadyCounted && optionIndex === currentQuestion.correctIndex) {
      setRunPoints((p) => p + 10);
      setCounted((c) => ({ ...c, [currentQuestion.id]: true }));
    }
  };

  const next = () => {
    if (current < shuffledQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(20);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const back = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const score = shuffledQuestions.reduce((acc, q) => {
    const a = answers[q.id];
    if (a === q.correctIndex) return acc + 1;
    return acc;
  }, 0);

  const restart = () => {
    // reshuffle questions on restart
    const arr = QUESTIONS.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledQuestions(arr);
    const init: Record<number, number | null> = {};
    arr.forEach((q) => (init[q.id] = null));
    setAnswers(init);
    setCurrent(0);
    setFinished(false);
    setRunPoints(0);
    setCounted({});
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
    }
  }, [finished]);

  const [playerName, setPlayerName] = useState('');

  const submitToLeaderboard = () => {
    const name = (playerName || 'Anoniem').trim();
    try {
      const raw = localStorage.getItem('gib_leaderboard');
      const board = raw ? JSON.parse(raw) as Array<{ name: string; points: number; date: string }> : [];
      board.push({ name, points: runPoints, date: new Date().toISOString() });
      board.sort((a, b) => b.points - a.points);
      localStorage.setItem('gib_leaderboard', JSON.stringify(board));
      // also update total points optionally
      const totalRaw = Number(localStorage.getItem('gib_totalPoints') ?? 0);
      localStorage.setItem('gib_totalPoints', String(totalRaw + runPoints));
      // navigate to leaderboard
      history.push('/tab3');
    } catch (e) {
      // ignore
    }
  };

  // Timer effect per question
  useEffect(() => {
    if (finished) return;
    if (answers[currentQuestion.id] !== null) return; // stop timer if answered
    setTimeLeft(20);
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          // mark as unanswered (timeout) so explanation shows
          setAnswers((prevAns) => ({ ...prevAns, [currentQuestion.id]: null }));
          setShowExplanation(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [current, finished, answers]);

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
            <IonCardTitle>Leer afval scheiden — vraag {current + 1} van {QUESTIONS.length}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ marginBottom: 12 }}>
              <IonProgressBar value={(current + (finished ? 1 : 0)) / QUESTIONS.length} />
            </div>
            <div className="timer-bar" aria-hidden>
              <div className="timer-fill" style={{ width: `${(timeLeft / 20) * 100}%` }} />
            </div>

            {!finished ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ marginTop: 0 }}>{currentQuestion.text}</h3>
                  <div style={{ fontSize: 14, color: '#556' }}>{timeLeft}s</div>
                </div>
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
                  <IonButton onClick={() => { if (!showExplanation && answers[currentQuestion.id] !== null) { setShowExplanation(true); } else { next(); } }} disabled={!(showExplanation || answers[currentQuestion.id] !== null)}>{current < shuffledQuestions.length - 1 ? (showExplanation ? 'Volgende' : 'Toon uitleg') : (showExplanation ? 'Bekijk resultaat' : 'Toon uitleg')}</IonButton>
                </div>
              </div>
            ) : (
              <div>
                <h3>Resultaat</h3>
                  <p><strong>Score: {score} / {QUESTIONS.length}</strong></p>
                  <p><strong>Punten deze ronde: {runPoints}</strong></p>
                <IonList>
                  {QUESTIONS.map((q) => (
                    <IonItem key={q.id} lines="full">
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <IonText><strong>{q.id}. {q.text}</strong></IonText>
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
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ marginBottom: 8 }}>
                    <small>Wil je je punten bewaren op het leaderboard? Vul je naam in:</small>
                  </div>
                  <IonInput placeholder="Je naam" value={playerName} onIonChange={(e) => setPlayerName(String(e.detail.value ?? ''))} />
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
