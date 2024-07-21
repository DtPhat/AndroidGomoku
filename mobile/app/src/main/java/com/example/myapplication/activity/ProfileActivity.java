package com.example.myapplication.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import com.example.myapplication.R;
import com.example.myapplication.activity.history.HistoryActivity;
import com.example.myapplication.activity.history.HistoryDetailActivity;
import com.example.myapplication.adapter.GameHistoryAdapter;
import com.example.myapplication.adapter.RecyclerViewInterface;
import com.example.myapplication.api.GameHistoryRepository;
import com.example.myapplication.model.GameHistoryItem;
import com.example.myapplication.model.Message;
import com.example.myapplication.model.response.GameHistoryResponse;
import com.example.myapplication.model.response.MessageReponse;
import com.example.myapplication.services.GameService;
import com.example.myapplication.socket.NotificationHelper;

import com.example.myapplication.tokenManager.TokenManager;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileActivity extends AppCompatActivity implements RecyclerViewInterface {

    private GameService gameService;
    private ImageView avatar;
    private Button btnLogout;
    private TextView txtUsername, coinDisplay;
    private RecyclerView rvHistory;
    private JSONObject user = TokenManager.getUserObject();
    private List<GameHistoryItem> gameHistoryItemList;
    private GameHistoryAdapter GHAdapter;

    LinearLayout llRecentMatches;

    private NotificationHelper notificationHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_profile);

        notificationHelper = new NotificationHelper(this);

        ImageButton backButton = findViewById(R.id.backButton);


        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();  // Finish the activity to go back
            }
        });

        rvHistory = findViewById(R.id.rvHistory);
        avatar = findViewById(R.id.avatar);
        btnLogout = findViewById(R.id.btnLogout);
        txtUsername = findViewById(R.id.txtUsername);
        coinDisplay = findViewById(R.id.coinDisplay);
        llRecentMatches = findViewById(R.id.layoutRecentMatches);

        gameService = GameHistoryRepository.getGameService();

        loadUserData();
        bindRecyclerView();
        loadGameHistory();

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logOutAndNavigateToLogin();
            }
        });

        llRecentMatches.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileActivity.this, HistoryActivity.class);
                startActivity(intent);
            }
        });

    }

    private void loadUserData() {
        StringBuilder coinDisplayTxt = new StringBuilder("Coins: ");
        try {

            txtUsername.setText(user.getString("fullName"));

            Log.d("USER", user.toString());
            String imageUrl = user.getString("profilePic");

            Picasso.get().load(imageUrl).into(avatar);
            coinDisplayTxt.append(String.valueOf(user.get("wallet")));
            coinDisplay.setText(coinDisplayTxt);
        } catch (JSONException e) {
            //throw new RuntimeException(e);
        }
    }

    private void bindRecyclerView(){
        rvHistory.setLayoutManager(new LinearLayoutManager(this));
        gameHistoryItemList = new ArrayList<>();
        GHAdapter = new GameHistoryAdapter(gameHistoryItemList, this);
        rvHistory.setAdapter(GHAdapter);

    }

    private void loadGameHistory(){



        try {
            Call<GameHistoryResponse> call = gameService.getGameHistory("Bearer " + TokenManager.getToken());

            call.enqueue(new Callback<GameHistoryResponse>() {
                @Override
                public void onResponse(Call<GameHistoryResponse> call, Response<GameHistoryResponse> response) {
                    if (response.body() != null) {
                        GameHistoryResponse gameHistoryResponse = response.body();

                        if (gameHistoryResponse.isOnSuccess()) {

                            List<GameHistoryItem> historyList = gameHistoryResponse.getData();


                            for (int i = 0; i < 5 && i < historyList.size(); i++) {
                                GameHistoryItem history = historyList.get(i);
                                gameHistoryItemList.add(new GameHistoryItem(history.getPrice(), history.getResult(), history.getCompetitor(), history.getCreatedAt()));
                            }
                            GHAdapter.notifyDataSetChanged();
                        }
                    }
                }
                @Override
                public void onFailure(Call<GameHistoryResponse> call, Throwable t) {
                    t.printStackTrace();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    private void logOutAndNavigateToLogin() {
        Intent intent = new Intent(ProfileActivity.this, LoginActivity.class);
        startActivity(intent);
        finish();
    }

    @Override
    public void onItemClick(int position) {
        Log.d("RecylerClick", "phase4");

        Intent intent = new Intent(getApplicationContext(), HistoryDetailActivity.class);
        Log.d("RecylerClick", "phase5");

        GameHistoryItem item =  gameHistoryItemList.get(position);
        String opponentName = item.getCompetitor().getFullName();
        String opponentPic = item.getCompetitor().getProfilePic();
        double price = item.getPrice();
        String result = item.getResult();
        String createdAt = item.getCreatedAt();
        Log.d("RecylerClick", "phase6");

        intent.putExtra("name", opponentName);
        intent.putExtra("pic", opponentPic);
        intent.putExtra("price", price);
        intent.putExtra("result", result);
        intent.putExtra("createdAt", createdAt);
        Log.d("RecylerClick", "phase7");

        startActivity(intent);
        Log.d("RecylerClick", "phase8");

    }
}