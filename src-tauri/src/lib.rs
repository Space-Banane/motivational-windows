use rand::seq::SliceRandom;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn motivation(evil: bool) -> String {
    let motivations = &[
        "Keep pushing forward!",
        "Believe in yourself!",
        "Every day is a new opportunity!" ,
        "You are capable of amazing things!",
        "Stay focused and determined!",
    ];
    let evil_motivations = &[
        "You call that an effort? Pathetic.",
        "Even a snail can reach its destination eventually.",
        "Your dreams are as useless as your excuses.",
        "If you were any lazier, you'd be in a coma.",
        "Why try? Failure is inevitable for someone like you.",
    ];
    let mut rng = rand::thread_rng();
    if evil {
        evil_motivations.choose(&mut rng).unwrap_or(&"Stay hating!").to_string()
    } else {
        motivations.choose(&mut rng).unwrap_or(&"Stay motivated!").to_string()
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, motivation])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
