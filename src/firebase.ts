import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, query, orderByChild } from "firebase/database";
import type { Wish } from "./components/WishesList";

// TODO: Replace with your Firebase config from console.firebase.google.com
const firebaseConfig = {
	apiKey: "AIzaSyBPS4QxKO2fpXW-3r33PHOy3523FIhChZQ",
	authDomain: "gender-reveal-f9bd7.firebaseapp.com",
	databaseURL: "https://gender-reveal-f9bd7-default-rtdb.firebaseio.com",
	projectId: "gender-reveal-f9bd7",
	storageBucket: "gender-reveal-f9bd7.firebasestorage.app",
	messagingSenderId: "935120706392",
	appId: "1:935120706392:web:a86aca24140678d89d232d",
	measurementId: "G-BYLJ8WBQPV",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Vote type
export interface Vote {
	id: string;
	name: string;
	gender: "boy" | "girl";
	timestamp: number;
}

export interface VoteData {
	boyVotes: Vote[];
	girlVotes: Vote[];
}

const votersRef = ref(database, "voters");

export const submitVote = async (gender: "boy" | "girl", name: string) => {
	await push(votersRef, {
		name,
		gender,
		timestamp: Date.now(),
	});
};

export const subscribeToVotes = (callback: (data: VoteData) => void) => {
	const votersQuery = query(votersRef, orderByChild("timestamp"));
	return onValue(votersQuery, (snapshot) => {
		const data = snapshot.val();
		if (!data) {
			callback({ boyVotes: [], girlVotes: [] });
			return;
		}

		const allVotes: Vote[] = Object.entries(data).map(([id, vote]) => ({
			id,
			...(vote as Omit<Vote, "id">),
		}));

		const boyVotes = allVotes.filter((v) => v.gender === "boy");
		const girlVotes = allVotes.filter((v) => v.gender === "girl");

		callback({ boyVotes, girlVotes });
	});
};

// Wishes functions
const wishesRef = ref(database, "wishes");

export const submitWish = async (name: string, message: string) => {
	await push(wishesRef, {
		name,
		message,
		timestamp: Date.now(),
	});
};

export const subscribeToWishes = (callback: (wishes: Wish[]) => void) => {
	const wishesQuery = query(wishesRef, orderByChild("timestamp"));
	return onValue(wishesQuery, (snapshot) => {
		const data = snapshot.val();
		if (!data) {
			callback([]);
			return;
		}
		const wishes: Wish[] = Object.entries(data).map(([id, wish]) => ({
			id,
			...(wish as Omit<Wish, "id">),
		}));
		// Sort by timestamp descending (newest first)
		wishes.sort((a, b) => b.timestamp - a.timestamp);
		callback(wishes);
	});
};
