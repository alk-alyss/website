const translations = {
	"store": "Κατάστημα",
	"new": "Νεόδμητο",
	"renovated": "Ανακαινισμένο",
	"good": "Καλή κατάσταση",
	"old": "Χρήζει ανακατασκευής",
	"autonomous": "Αυτόνομη",
	"central": "Κεντρική",
	"oil": "Πετρέλαιο",
	"gas": "Φυσικό Αέριο",
	"wood": "Ξύλο",
	"electricity": "Ρεύμα",
	"geothermal": "Γεωθερμία",
	"solar": "Ηλιακό",
	"residential": "Οικιστική",
	"commercial": "Εμπορική",
	"industrial": "Βιομηχανική",
	"agricultural": "Αγροτική",
	"forest": "Δασική",
	"office": "Γραφεία",
	"warehouse": "Αποθήκη",
	"hotel": "Ξενοδοχείο",
	"business": "Επιχείρηση",
	"show_room": "Εκθεσιακός Χώρος",
	"shop": "Κατάστημα",
	"other": "Άλλο",
	"parking": "Χώρος στάθμευσης",
	"elevator": "Ανελκυστήρας",
	"storage": "Αποθήκη",
	"alarm": "Συναγερμός",
	"loading_dock": "Πλατφόρμα φορτοεκφόρτωσης",
	"fireplace": "Τζάκι",
	"air_condition": "Κληματιστικό",
	"studio": "Στούντιο",
	"complex": "Πολυκατοικία",
	"maisonette": "Μεζονέτα",
	"house": "Μονοκατοικία",
	"appartment": "Διαμέρισμα",
	"penthouse": "Ρετιρέ",
	"garden": "Κήπος",
	"balcony": "Βαλκόνι",
	"furnished": "Επιπλωμένο",
	"solar_heating": "Ηλιακός θερμοσίφωνας",
	"security_door": "Πόρτα ασφαλείας",
	"pets": "Δεκτά κατοικίδια",
	"student": "Κατάλληλο για φοιτητές",
	"field": "Χωράφι",
	"island": "Νησί",
}
export async function translateListing(listing) {
	for (const [key, value] of Object.entries(listing)) {
		if (Object.keys(translations).includes(value)) {
			listing[key] = translations[value]
		}
	}

	listing.location = listing.location.charAt(0).toUpperCase() + listing.location.slice(1)

	for (const [key, value] of Object.entries(listing.extras)) {
		if (listing.extras[key])
			listing.extras[key] = translations[key]
	}

	return listing
}